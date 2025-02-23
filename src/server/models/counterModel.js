// src/backend/models/counterModel.js
import mongoose from 'mongoose';

const CounterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    sequence_value: { type: Number, default: 0 },
});

export default mongoose.models.Counter ||
    mongoose.model('Counter', CounterSchema);
