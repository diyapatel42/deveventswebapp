// Central export file for all database models
// Import from this file to access any model: import { Event, Booking } from "@/database"

import Event, { IEvent } from "./event.model";
import Booking, { IBooking } from "./booking.model";

// Export models
export { Event, Booking };

// Export TypeScript interfaces for use in other files
export type { IEvent, IBooking };

