"use client";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { useResumeStore } from "@/store/resume-store";
import type { SectionId } from "@/lib/schema/resume";
import { cn } from "@/lib/utils";

const LABELS: Record<SectionId, string> = {
  summary: "Professional Summary",
  skills: "Technical Skills",
  experience: "Work Experience",
  projects: "Projects",
  certifications: "Certifications",
  education: "Education",
  opensource: "Open Source",
  languages: "Languages",
};

function SortableItem({ id }: { id: SectionId }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  return (
    <li
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-md border border-cv bg-[var(--cv-bg)] text-sm",
        isDragging && "opacity-60 shadow-md",
      )}
    >
      <button
        type="button"
        className="cursor-grab text-cv-muted hover:text-cv-accent touch-none"
        {...attributes}
        {...listeners}
        aria-label="Drag to reorder"
      >
        <GripVertical className="h-4 w-4" />
      </button>
      {LABELS[id]}
    </li>
  );
}

export function SectionOrderEditor() {
  const sectionOrder = useResumeStore((s) => s.resume.sectionOrder);
  const setSectionOrder = useResumeStore((s) => s.setSectionOrder);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = sectionOrder.indexOf(active.id as SectionId);
    const newIndex = sectionOrder.indexOf(over.id as SectionId);
    setSectionOrder(arrayMove(sectionOrder, oldIndex, newIndex));
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={sectionOrder} strategy={verticalListSortingStrategy}>
        <ul className="space-y-2">
          {sectionOrder.map((id) => (
            <SortableItem key={id} id={id} />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}
