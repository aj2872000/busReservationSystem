// server.js
const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const DATA_DIR = path.join(__dirname);
const BUSES_FILE = path.join(DATA_DIR, "buses.txt");
const BOOKINGS_FILE = path.join(DATA_DIR, "bookings.txt");
const DELIM = "|";

// Helper - read file into array of arrays (split by '|')
async function readFileLines(filePath) {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const lines = raw.split("\n").map(l => l.trim()).filter(Boolean);
    return lines.map(line => line.split(DELIM));
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

// Helper - write array of arrays back to file
async function writeFileLines(filePath, rows) {
  const content = rows.map(r => r.join(DELIM)).join("\n") + (rows.length ? "\n" : "");
  // atomic-ish write: write to temp then rename
  const tmp = filePath + ".tmp";
  await fs.writeFile(tmp, content, "utf8");
  await fs.rename(tmp, filePath);
}

// GET /buses
// returns list of buses with computed available seats & available_seat_numbers
app.get("/buses", async (req, res) => {
  try {
    const busesRows = await readFileLines(BUSES_FILE);
    const bookingRows = await readFileLines(BOOKINGS_FILE);

    // bookings per bus -> set of booked seat numbers (strings)
    const bookedMap = {};
    for (const b of bookingRows) {
      const [, bus_id, seat_no] = b; // [name, bus_id, seat_no]
      if (!bookedMap[bus_id]) bookedMap[bus_id] = new Set();
      bookedMap[bus_id].add(String(seat_no));
    }

    const buses = busesRows.map(cols => {
      // expected bus format:
      // <Bus ID>|<Bus Name>|<Source>|<Destination>|<Departure Time>|<Total Seats>
      const [bus_id, name, source, destination, time, totalSeatsStr] = cols;
      const total_seats = Number(totalSeatsStr) || 0;
      const bookedSet = bookedMap[bus_id] || new Set();

      // generate all seat numbers as strings from 1..total_seats
      const allSeats = Array.from({ length: total_seats }, (_, i) => String(i + 1));
      const available_seat_numbers = allSeats.filter(s => !bookedSet.has(s));
      const available_seats = available_seat_numbers.length;

      return {
        bus_id,
        name,
        source,
        destination,
        time,
        total_seats,
        available_seats,
        available_seat_numbers
      };
    });

    res.json(buses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to read buses" });
  }
});

// GET /bookings
// returns array of bookings: [ [name, bus_id, seat_no], ... ]
app.get("/bookings", async (req, res) => {
  try {
    const bookingRows = await readFileLines(BOOKINGS_FILE);
    res.json(bookingRows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to read bookings" });
  }
});

// POST /book
// payload: { name, bus_id, seat_no }
app.post("/book", async (req, res) => {
  try {
    const { name, bus_id, seat_no } = req.body || {};
    console.log("ajay12", req.body)
    if (!name || !bus_id || !seat_no) {
      return res.status(400).json({ error: "Missing name, bus_id or seat_no" });
    }

    // read bus to validate existence and seat range
    const buses = await readFileLines(BUSES_FILE);
    const bus = buses.find(b => b[0] === String(bus_id));
    if (!bus) return res.status(404).json({ error: "Bus not found" });

    const total_seats = Number(bus[5]) || 0;
    const seatNum = Number(seat_no);
    if (!Number.isInteger(seatNum) || seatNum < 1 || seatNum > total_seats) {
      return res.status(400).json({ error: "Invalid seat number" });
    }

    // check if seat already booked
    const bookings = await readFileLines(BOOKINGS_FILE);
    const conflict = bookings.find(b => b[1] === String(bus_id) && b[2] === String(seat_no));
    if (conflict) return res.status(400).json({ error: "Seat already booked" });

    // append booking
    const line = [String(name), String(bus_id), String(seat_no)].join(DELIM) + "\n";
    await fs.appendFile(BOOKINGS_FILE, line, "utf8");

    res.json({ message: "Booking successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create booking" });
  }
});

// POST /cancel
// payload: { name, bus_id, seat_no }
app.post("/cancel", async (req, res) => {
  try {
    const { name, bus_id, seat_no } = req.body || {};
    if (!name || !bus_id || !seat_no) {
      return res.status(400).json({ error: "Missing name, bus_id or seat_no" });
    }

    const bookings = await readFileLines(BOOKINGS_FILE);
    const filtered = bookings.filter(
      b => !(b[0] === String(name) && b[1] === String(bus_id) && b[2] === String(seat_no))
    );

    if (filtered.length === bookings.length) {
      return res.status(404).json({ error: "No matching booking found" });
    }

    // write back filtered bookings
    await writeFileLines(BOOKINGS_FILE, filtered);

    res.json({ message: "Booking cancelled successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to cancel booking" });
  }
});

// Helper endpoint: seed sample files (optional)
app.post("/seed", async (req, res) => {
  try {
    const sampleBuses = [
      ["1", "BusA", "Mumbai", "Pune", "10:00AM", "40"],
      ["2", "BusB", "Delhi", "Jaipur", "14:00", "30"],
      ["3", "Express C", "Bangalore", "Chennai", "09:30", "45"]
    ];
    const sampleBookings = [
      ["Ajay", "1", "12"],
      ["John", "2", "4"]
    ];
    await writeFileLines(BUSES_FILE, sampleBuses);
    await writeFileLines(BOOKINGS_FILE, sampleBookings);
    res.json({ message: "Seeded sample data" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to seed files" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
