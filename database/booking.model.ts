import mongoose, { Schema, Document, Model, Types } from "mongoose";
import Event from "./event.model";

// TypeScript interface defining the Booking document structure
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

// Email validation regex pattern (RFC 5322 simplified)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Booking schema definition with validation rules
const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event", // Reference to Event model for population
      required: [true, "Event ID is required"],
      index: true, // Index for faster event-based queries
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true, // Normalize email to lowercase
      validate: {
        validator: (value: string) => EMAIL_REGEX.test(value),
        message: "Please provide a valid email address",
      },
    },
  },
  {
    timestamps: true, // Auto-generates createdAt and updatedAt
  }
);

/**
 * Pre-save hook for Booking model.
 * - Validates that the referenced eventId exists in the database
 * - Ensures email format is valid before saving
 */
BookingSchema.pre("save", async function () {
  // Validate email format
  if (!EMAIL_REGEX.test(this.email)) {
    throw new Error("Invalid email format");
  }

  // Verify the referenced event exists
  // Only check if eventId is new or modified to avoid unnecessary queries
  if (this.isModified("eventId") || this.isNew) {
    const eventExists = await Event.findById(this.eventId);

    if (!eventExists) {
      throw new Error(
        `Event with ID ${this.eventId} does not exist. Cannot create booking for non-existent event.`
      );
    }
  }
});

// Create and export the Booking model
// Check if model already exists to prevent recompilation errors in development
const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;

