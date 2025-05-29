import { Schema, model } from 'mongoose';

const EntrySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mood: {
    type: String,
    required: true,
    enum: ['Happy', 'Sad', 'Angry', 'Tired', 'Calm']
  },
  note: {
    type: String,
    default: ''
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default model('Entry', EntrySchema);