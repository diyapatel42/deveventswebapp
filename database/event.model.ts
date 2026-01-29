import mongoose, { Schema, Document, Model } from "mongoose";

// TypeScript interface defining the Event document structure
export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: "online" | "offline" | "hybrid";
  createdAt: Date;
  updatedAt: Date;
}

// Event schema definition with validation rules
const EventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100,'Cannot exceed 100 characters'],
    },
    slug: {
      type: String,
      unique: true,
      index: true, // Index for faster slug-based queries
      maxlength: [100,'Cannot exceed 100 characters'],

    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [100,'Cannot exceed 100 characters'],

    },
    overview: {
      type: String,
      required: [true, "Overview is required"],
      trim: true,
      maxlength: [100,'Cannot exceed 100 characters'],

    },
    image: {
      type: String,
      required: [true, "Image is required"],
      trim: true,
      maxlength: [100,'Cannot exceed 100 characters'],

    },
    venue: {
      type: String,
      required: [true, "Venue is required"],
      trim: true,
      maxlength: [100,'Cannot exceed 100 characters'],

    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
      maxlength: [100,'Cannot exceed 100 characters'],

    },
    date: {
      type: String,
      required: [true, "Date is required"],
      maxlength: [100,'Cannot exceed 100 characters'],

    },
    time: {
      type: String,
      required: [true, "Time is required"],
      maxlength: [100,'Cannot exceed 100 characters'],
    },
    mode: {
      type: String,
      required: [true, "Mode is required"],
      enum: {
        values: ["online", "offline", "hybrid"],
        message: "Mode must be online, offline, or hybrid",
      },
      maxlength: [100,'Cannot exceed 100 characters'],

    },
  },
  {
    timestamps: true, // Auto-generates createdAt and updatedAt
  }
);

/**
 * Generates a URL-friendly slug from a title string.
 * Converts to lowercase, replaces spaces with hyphens, removes special characters.
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters except hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
}

/**
 * Normalizes a date string to ISO format (YYYY-MM-DD).
 * Accepts various date formats and converts them to a consistent format.
 */
function normalizeDateToISO(dateStr: string): string {
  const parsedDate = new Date(dateStr);

  // Validate the parsed date
  if (isNaN(parsedDate.getTime())) {
    throw new Error(`Invalid date format: ${dateStr}`);
  }

  // Return ISO date string (YYYY-MM-DD)
  return parsedDate.toISOString().split("T")[0];
}

/**
 * Normalizes time to a consistent 12-hour format (HH:MM AM/PM).
 * Handles various input formats including 24-hour time.
 */
function normalizeTime(timeStr: string): string {
  // If already in expected format (e.g., "09:00 AM - 06:00 PM"), return as-is
  if (/^\d{1,2}:\d{2}\s*(AM|PM)/i.test(timeStr)) {
    return timeStr.toUpperCase();
  }

  // Try to parse 24-hour format (e.g., "14:30")
  const match24Hour = timeStr.match(/^(\d{1,2}):(\d{2})$/);
  if (match24Hour) {
    let hours = parseInt(match24Hour[1], 10);
    const minutes = match24Hour[2];
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert to 12-hour format
    return `${hours.toString().padStart(2, "0")}:${minutes} ${period}`;
  }

  // Return original if format is already acceptable
  return timeStr;
}

/**
 * Pre-save hook for Event model.
 * - Generates slug from title (only if title is new or modified)
 * - Normalizes date to ISO format
 * - Normalizes time to consistent format
 * - Validates required fields are non-empty
 */
EventSchema.pre("save", async function () {
  // Validate required fields are non-empty strings
  const requiredFields: (keyof IEvent)[] = [
    "title",
    "description",
    "overview",
    "image",
    "venue",
    "location",
    "date",
    "time",
    "mode",
  ];

  for (const field of requiredFields) {
    const value = this[field];
    if (typeof value === "string" && !value.trim()) {
      throw new Error(`${field} cannot be empty`);
    }
  }

  // Generate slug only if title is new or modified
  if (this.isModified("title") || this.isNew) {
    const baseSlug = generateSlug(this.title);
    let slug = baseSlug;
    let counter = 1;

    // Ensure slug uniqueness by appending a counter if needed
    const EventModel = mongoose.model<IEvent>("Event");
    while (await EventModel.findOne({ slug, _id: { $ne: this._id } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    this.slug = slug;
  }

  // Normalize date to ISO format if modified or new
  if (this.isModified("date") || this.isNew) {
    this.date = normalizeDateToISO(this.date);
  }

  // Normalize time format if modified or new
  if (this.isModified("time") || this.isNew) {
    this.time = normalizeTime(this.time);
  }
});

// Create and export the Event model
// Check if model already exists to prevent recompilation errors in development
const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);

export default Event;

