import mongoose, { Document, Schema } from "mongoose";

export interface ProjectDocument extends Document {
  name: string;
  description: string | null;
  emoji: string | null;
  workspace: mongoose.Types.ObjectId; // Reference to Workspace
  createdBy: mongoose.Types.ObjectId; // Reference to User
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<ProjectDocument>(
  {
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    description: { 
        type: String, 
        required: false 
    },
    emoji: { 
        type: String, 
        required: false,
        trim: true,
        default: "📊"
    },
    workspace: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);


const ProjectModel = mongoose.model<ProjectDocument>("Project", projectSchema);

export default ProjectModel; 