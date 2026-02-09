import { useState } from "react";
import {
    ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";

import AttendanceCard from "../components/AttendanceCard";

export default function AttendanceStudent() {

  return(
    <div className="space-y-4">
      <AttendanceCard className="Class 1" date="19/01/2026" time="13.30" status="Present" />
      <AttendanceCard className="Class 2" date="20/01/2026" time="09.00" status="Absent" />
    </div>

  );
}