/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useRef } from 'react';
import { useCvStore } from '@/store/useCvStore';
import { ChevronDown, Plus, User, Trash2, Check } from 'lucide-react';

export default function ContactStep() {
  const contact = useCvStore((state) => state.contact);
  const updateContact = useCvStore((state) => state.updateContact);
  const setPhoto = useCvStore((state) => state.setPhoto);
  const removePhoto = useCvStore((state) => state.removePhoto);

  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPhoto(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-7 pb-20 sm:pb-28">
      {/* 1. Step Heading */}
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#0F1B4D] tracking-tight leading-tight">
          Let’s start with your contact details
        </h1>
        <p className="text-slate-500 text-sm sm:text-base mt-2 font-normal">
          To help employers contact you, we recommend adding your name, email, and phone number.
        </p>
      </div>

      {/* 2. Form Grid (2 Columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
        {/* First name */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">
            First name
          </label>
          <div className="relative">
            <input
              type="text"
              value={contact.firstName}
              onChange={(e) => updateContact({ firstName: e.target.value })}
              placeholder="e.g. Elsa"
              className="w-full h-[56px] pl-4 pr-11 rounded-xl border border-[#E3E6F0] bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#4B4DED] focus:ring-2 focus:ring-[#4B4DED]/10 transition-all text-sm sm:text-base shadow-2xs"
            />
            {contact.firstName.trim().length > 0 && (
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#00C26D] flex items-center justify-center">
                <Check className="w-5 h-5 stroke-[2.5]" />
              </div>
            )}
          </div>
        </div>

        {/* Last name */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">
            Last name
          </label>
          <div className="relative">
            <input
              type="text"
              value={contact.lastName}
              onChange={(e) => updateContact({ lastName: e.target.value })}
              placeholder="e.g. Manet"
              className="w-full h-[56px] pl-4 pr-11 rounded-xl border border-[#E3E6F0] bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#4B4DED] focus:ring-2 focus:ring-[#4B4DED]/10 transition-all text-sm sm:text-base shadow-2xs"
            />
            {contact.lastName.trim().length > 0 && (
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#00C26D] flex items-center justify-center">
                <Check className="w-5 h-5 stroke-[2.5]" />
              </div>
            )}
          </div>
        </div>

        {/* Job title */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">
            Job title
          </label>
          <div className="relative">
            <input
              type="text"
              value={contact.jobTitle}
              onChange={(e) => updateContact({ jobTitle: e.target.value })}
              placeholder="e.g. Experienced Sales Advisor"
              className="w-full h-[56px] pl-4 pr-11 rounded-xl border border-[#E3E6F0] bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#4B4DED] focus:ring-2 focus:ring-[#4B4DED]/10 transition-all text-sm sm:text-base shadow-2xs"
            />
            {contact.jobTitle.trim().length > 0 && (
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#00C26D] flex items-center justify-center">
                <Check className="w-5 h-5 stroke-[2.5]" />
              </div>
            )}
          </div>
        </div>

        {/* Photo (optional) with avatar preview */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">
            Photo (optional)
          </label>
          <div className="flex items-center gap-3.5 h-[56px]">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />

            {/* Avatar Circle */}
            <div className="relative w-12 h-12 rounded-full bg-[#E2E8F0] overflow-hidden flex items-center justify-center shrink-0 border border-slate-300">
              {contact.photoUrl ? (
                <img
                  src={contact.photoUrl}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="relative flex items-center justify-center w-full h-full">
                  <User className="w-6 h-6 text-slate-400" />
                  <div className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-slate-400 text-white flex items-center justify-center text-[9px] font-bold">
                    <Plus className="w-2.5 h-2.5 stroke-[2.5]" />
                  </div>
                </div>
              )}
            </div>

            {/* Action Button */}
            {!contact.photoUrl ? (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-5 py-2.5 bg-[#EEF0FF] hover:bg-[#E2E5FD] text-[#4B4DED] font-semibold text-sm rounded-xl transition-colors cursor-pointer"
              >
                Add a photo
              </button>
            ) : (
              <button
                type="button"
                onClick={removePhoto}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="contact-email" className="block text-sm font-semibold text-slate-800 mb-2">
            Email
          </label>
          <div className="relative">
            <input
              id="contact-email"
              type="email"
              value={contact.email}
              onChange={(e) => updateContact({ email: e.target.value })}
              placeholder="e.g. elsa.manet@gmail.com"
              className="w-full h-[56px] pl-4 pr-11 rounded-xl border border-[#E3E6F0] bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#4B4DED] focus:ring-2 focus:ring-[#4B4DED]/10 transition-all text-sm sm:text-base shadow-2xs"
            />
            {contact.email.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim()) && (
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#00C26D] flex items-center justify-center">
                <Check className="w-5 h-5 stroke-[2.5]" />
              </div>
            )}
          </div>
        </div>

        {/* Phone number */}
        <div>
          <label htmlFor="contact-phone" className="block text-sm font-semibold text-slate-800 mb-2">
            Phone number
          </label>
          <div className="relative">
            <input
              id="contact-phone"
              type="tel"
              value={contact.phone}
              onChange={(e) => updateContact({ phone: e.target.value })}
              placeholder="e.g. (020) 1234 5678"
              className="w-full h-[56px] pl-4 pr-11 rounded-xl border border-[#E3E6F0] bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#4B4DED] focus:ring-2 focus:ring-[#4B4DED]/10 transition-all text-sm sm:text-base shadow-2xs"
            />
            {contact.phone.trim().length > 0 && (
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#00C26D] flex items-center justify-center">
                <Check className="w-5 h-5 stroke-[2.5]" />
              </div>
            )}
          </div>
        </div>

        {/* Postal code */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">
            Postal code
          </label>
          <div className="relative">
            <input
              type="text"
              value={contact.postalCode}
              onChange={(e) => updateContact({ postalCode: e.target.value })}
              placeholder="e.g. SW1A 1AA"
              className="w-full h-[56px] pl-4 pr-11 rounded-xl border border-[#E3E6F0] bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#4B4DED] focus:ring-2 focus:ring-[#4B4DED]/10 transition-all text-sm sm:text-base shadow-2xs"
            />
            {contact.postalCode.trim().length > 0 && (
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#00C26D] flex items-center justify-center">
                <Check className="w-5 h-5 stroke-[2.5]" />
              </div>
            )}
          </div>
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">
            City
          </label>
          <div className="relative">
            <input
              type="text"
              value={contact.city}
              onChange={(e) => updateContact({ city: e.target.value })}
              placeholder="e.g. London"
              className="w-full h-[56px] pl-4 pr-11 rounded-xl border border-[#E3E6F0] bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#4B4DED] focus:ring-2 focus:ring-[#4B4DED]/10 transition-all text-sm sm:text-base shadow-2xs"
            />
            {contact.city.trim().length > 0 && (
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#00C26D] flex items-center justify-center">
                <Check className="w-5 h-5 stroke-[2.5]" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Collapsible Accordion: Add more details */}
      <div className="rounded-2xl border border-[#E3E6F0] bg-white overflow-hidden transition-all duration-200">
        <button
          type="button"
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
          className="w-full py-4 px-5 flex items-center justify-between text-left font-semibold text-[#0F1B4D] text-sm sm:text-base hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <span>Add more details (Date of birth, Nationality, etc.)</span>
          <ChevronDown
            className={`w-5 h-5 text-slate-500 transition-transform duration-200 ${
              isAccordionOpen ? 'rotate-180 text-[#4B4DED]' : ''
            }`}
          />
        </button>

        {isAccordionOpen && (
          <div className="p-5 pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-[fadeIn_0.15s_ease-out]">
            {/* Date of birth */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Date of birth
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={contact.dateOfBirth}
                  onChange={(e) => updateContact({ dateOfBirth: e.target.value })}
                  placeholder="e.g. 14 May 1996"
                  className="w-full h-[48px] pl-3.5 pr-10 rounded-lg border border-[#E3E6F0] text-sm text-slate-900 focus:outline-none focus:border-[#4B4DED]"
                />
                {contact.dateOfBirth?.trim().length > 0 && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#00C26D]">
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  </div>
                )}
              </div>
            </div>

            {/* Nationality */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Nationality
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={contact.nationality}
                  onChange={(e) => updateContact({ nationality: e.target.value })}
                  placeholder="e.g. British"
                  className="w-full h-[48px] pl-3.5 pr-10 rounded-lg border border-[#E3E6F0] text-sm text-slate-900 focus:outline-none focus:border-[#4B4DED]"
                />
                {contact.nationality?.trim().length > 0 && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#00C26D]">
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  </div>
                )}
              </div>
            </div>

            {/* LinkedIn */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                LinkedIn Profile
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={contact.linkedin}
                  onChange={(e) => updateContact({ linkedin: e.target.value })}
                  placeholder="e.g. linkedin.com/in/elsa-manet"
                  className="w-full h-[48px] pl-3.5 pr-10 rounded-lg border border-[#E3E6F0] text-sm text-slate-900 focus:outline-none focus:border-[#4B4DED]"
                />
                {contact.linkedin?.trim().length > 0 && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#00C26D]">
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  </div>
                )}
              </div>
            </div>

            {/* Website / Portfolio */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Website / Portfolio
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={contact.website}
                  onChange={(e) => updateContact({ website: e.target.value })}
                  placeholder="e.g. elsamanet.co.uk"
                  className="w-full h-[48px] pl-3.5 pr-10 rounded-lg border border-[#E3E6F0] text-sm text-slate-900 focus:outline-none focus:border-[#4B4DED]"
                />
                {contact.website?.trim().length > 0 && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#00C26D]">
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  </div>
                )}
              </div>
            </div>

            {/* Driving licence */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Driving licence
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={contact.drivingLicence}
                  onChange={(e) => updateContact({ drivingLicence: e.target.value })}
                  placeholder="e.g. Full UK Driving Licence (Clean)"
                  className="w-full h-[48px] pl-3.5 pr-10 rounded-lg border border-[#E3E6F0] text-sm text-slate-900 focus:outline-none focus:border-[#4B4DED]"
                />
                {contact.drivingLicence?.trim().length > 0 && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#00C26D]">
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
