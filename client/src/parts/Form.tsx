import React, { useState } from "react";
import { Contact, Relation, PlaceId, Organization } from "../../../shared/types";

interface ContactFormProps {
  existingContacts: Contact[]; // Contacts to suggest in relations
  onSubmit: (contact: Contact) => void; // Callback when form is submitted
}

export const ContactForm: React.FC<ContactFormProps> = ({ existingContacts, onSubmit }) => {
  const [form, setForm] = useState<Partial<Contact>>({
    id: "",
    civil: { first: "", second: "", last: "", title: "", suffix: "" },
    birth: { date: "", location: "" },
    death: { date: "", location: "" },
    location: [],
    LGBT: { orientation: "", gender: "", trans: false },
    job: [],
    mobile: "",
    email: "",
    photos: [],
    relations: [],
    socials: [],
    groups: [],
  });

  const updateField = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const updateNestedField = (key: keyof Contact, field: string, value: any) => {
    setForm((prev) => ({
      ...prev,
      [key]: { ...prev[key], [field]: value },
    }));
  };

  const addRelation = () => {
    setForm((prev) => ({
      ...prev,
      relations: [...(prev.relations || []), ["", ""]],
    }));
  };

  const updateRelation = (index: number, relType: string, target: string) => {
    setForm((prev) => {
      const updatedRelations = [...(prev.relations || [])];
      updatedRelations[index] = [relType, target];
      return { ...prev, relations: updatedRelations };
    });
  };

  const handleRelationTargetChange = (index: number, value: string) => {
    const matchingContacts = existingContacts.filter((c) =>
      c.civil.first.toLowerCase().includes(value.toLowerCase()) ||
      c.civil.last.toLowerCase().includes(value.toLowerCase())
    );

    updateRelation(index, form.relations?.[index][0] || "", value);
    return matchingContacts;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.id) {
      onSubmit(form as Contact);
    }
  };

  return (
    <form className="absolute abs-center space-y-4 p-8 bg-gray-50 border rounded-md" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block">First Name</label>
          <input
            type="text"
            className="w-full border rounded px-2"
            value={form.civil?.first || ""}
            onChange={(e) => updateNestedField("civil", "first", e.target.value)}
          />
        </div>
        <div>
          <label className="block">Last Name</label>
          <input
            type="text"
            className="w-full border rounded px-2"
            value={form.civil?.last || ""}
            onChange={(e) => updateNestedField("civil", "last", e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block">Birth Date</label>
          <input
            type="date"
            className="w-full border rounded px-2"
            value={form.birth?.date || ""}
            onChange={(e) => updateNestedField("birth", "date", e.target.value)}
          />
        </div>
        <div>
          <label className="block">Birth Location</label>
          <input
            type="text"
            className="w-full border rounded px-2"
            value={form.birth?.location || ""}
            onChange={(e) => updateNestedField("birth", "location", e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block">Mobile</label>
        <input
          type="text"
          className="w-full border rounded px-2"
          value={form.mobile || ""}
          onChange={(e) => updateField("mobile", e.target.value)}
        />
      </div>

      <div>
        <label className="block">Relations</label>
        {form.relations?.map((relation, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <input
              type="text"
              placeholder="Relation type"
              className="w-1/4 border rounded px-2"
              value={relation[0]}
              onChange={(e) => updateRelation(index, e.target.value, relation[1])}
            />
            <input
              type="text"
              placeholder="Target"
              className="w-1/2 border rounded px-2"
              value={relation[1]}
              onChange={(e) => handleRelationTargetChange(index, e.target.value)}
            />
          </div>
        ))}
        <button
          type="button"
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={addRelation}
        >
          Add Relation
        </button>
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
