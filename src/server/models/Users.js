import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import Counter from './counterModel';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    employeeId: {
        type: String,
        // required: true,
        unique: true,
        trim: true,
    },
    role: {
        type: String,
        required: true,
        trim: true,
        enum: ['admin', 'manager', 'cashier'],
        default: 'cashier',
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    deletedAt: {
        type: Date,
        default: null,
    },
    lastLogin: {
        type: Date,
        default: null,
    },
    isLogin: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isBanned: {
        type: Boolean,
        default: false,
    },
});

// Pre-save hook to auto-increment employeeId
UserSchema.pre('save', async function (next) {
    if (this.isNew && this.employeeId == null) {
        try {
            const counter = await Counter.findOneAndUpdate(
                { _id: 'employeeId' },
                { $inc: { sequence_value: 1 } },
                { new: true, upsert: true }
            );
            this.employeeId = counter.sequence_value;
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Compare entered password with hashed password
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
