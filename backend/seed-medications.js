/**
 * Medication Seed Script
 * Seeds the database with professional medication data
 * 
 * Usage: node seed-medications.js
 */

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Medication from './src/models/Medication.js';

// Load environment variables
dotenv.config({ path: './.env' });

const medications = [
  {
    name: "Paracetamol",
    genericName: "Acetaminophen",
    category: "Pain & Inflammation",
    form: "Tablet",
    strength: "500mg",
    prescriptionRequired: false,
    manufacturer: "Generic",
    description: "Used to treat pain and fever. Effective for mild to moderate pain relief.",
    sideEffects: ["Nausea", "Stomach upset"],
    contraindications: ["Liver disease", "Severe liver impairment"],
    price: 2.50,
    stock: 1000,
  },
  {
    name: "Amoxicillin",
    genericName: "Amoxicillin",
    category: "Antibiotics",
    form: "Capsule",
    strength: "500mg",
    prescriptionRequired: true,
    manufacturer: "Generic",
    description: "Broad-spectrum antibiotic used to treat various bacterial infections including respiratory, urinary, and skin infections.",
    sideEffects: ["Diarrhea", "Rash", "Nausea", "Vomiting"],
    contraindications: ["Penicillin allergy", "Severe kidney disease"],
    price: 15.00,
    stock: 500,
  },
  {
    name: "Metformin",
    genericName: "Metformin Hydrochloride",
    category: "Diabetes",
    form: "Tablet",
    strength: "850mg",
    prescriptionRequired: true,
    manufacturer: "Generic",
    description: "First-line medication for type 2 diabetes. Helps control blood sugar levels and improves insulin sensitivity.",
    sideEffects: ["Stomach upset", "Diarrhea", "Nausea", "Metallic taste"],
    contraindications: ["Kidney disease", "Liver disease", "Heart failure"],
    price: 12.00,
    stock: 800,
  },
  {
    name: "Ibuprofen",
    genericName: "Ibuprofen",
    category: "Pain & Inflammation",
    form: "Tablet",
    strength: "400mg",
    prescriptionRequired: false,
    manufacturer: "Generic",
    description: "Nonsteroidal anti-inflammatory drug (NSAID) used to reduce inflammation, pain, and fever.",
    sideEffects: ["Stomach pain", "Nausea", "Dizziness", "Headache"],
    contraindications: ["Stomach ulcers", "Kidney disease", "Heart disease", "Pregnancy (third trimester)"],
    price: 3.50,
    stock: 1200,
  },
  {
    name: "Azithromycin",
    genericName: "Azithromycin",
    category: "Antibiotics",
    form: "Tablet",
    strength: "500mg",
    prescriptionRequired: true,
    manufacturer: "Generic",
    description: "Macrolide antibiotic effective against respiratory infections, skin infections, and sexually transmitted diseases.",
    sideEffects: ["Diarrhea", "Nausea", "Stomach pain", "Vomiting"],
    contraindications: ["Liver disease", "Heart rhythm disorders"],
    price: 18.00,
    stock: 400,
  },
  {
    name: "Lisinopril",
    genericName: "Lisinopril",
    category: "Cardiovascular",
    form: "Tablet",
    strength: "10mg",
    prescriptionRequired: true,
    manufacturer: "Generic",
    description: "ACE inhibitor used to treat high blood pressure, heart failure, and improve survival after heart attacks.",
    sideEffects: ["Dizziness", "Cough", "Fatigue", "Headache"],
    contraindications: ["Pregnancy", "Kidney disease", "Angioedema history"],
    price: 8.50,
    stock: 600,
  },
  {
    name: "Salbutamol",
    genericName: "Albuterol",
    category: "Respiratory",
    form: "Inhaler",
    strength: "100mcg",
    prescriptionRequired: true,
    manufacturer: "Generic",
    description: "Bronchodilator used to treat and prevent asthma attacks and other breathing problems.",
    sideEffects: ["Tremor", "Nervousness", "Rapid heartbeat", "Headache"],
    contraindications: ["Heart rhythm disorders", "Severe heart disease"],
    price: 25.00,
    stock: 300,
  },
  {
    name: "Omeprazole",
    genericName: "Omeprazole",
    category: "Gastrointestinal",
    form: "Capsule",
    strength: "20mg",
    prescriptionRequired: true,
    manufacturer: "Generic",
    description: "Proton pump inhibitor used to treat acid reflux, stomach ulcers, and GERD.",
    sideEffects: ["Headache", "Diarrhea", "Stomach pain", "Nausea"],
    contraindications: ["Severe liver disease"],
    price: 10.00,
    stock: 700,
  },
  {
    name: "Sertraline",
    genericName: "Sertraline Hydrochloride",
    category: "Mental Health",
    form: "Tablet",
    strength: "50mg",
    prescriptionRequired: true,
    manufacturer: "Generic",
    description: "SSRI antidepressant used to treat depression, anxiety disorders, and obsessive-compulsive disorder.",
    sideEffects: ["Nausea", "Insomnia", "Diarrhea", "Dry mouth", "Fatigue"],
    contraindications: ["MAO inhibitors", "Pregnancy", "Severe liver disease"],
    price: 20.00,
    stock: 450,
  },
  {
    name: "Cetirizine",
    genericName: "Cetirizine Hydrochloride",
    category: "Allergy",
    form: "Tablet",
    strength: "10mg",
    prescriptionRequired: false,
    manufacturer: "Generic",
    description: "Antihistamine used to relieve allergy symptoms such as sneezing, runny nose, and itchy eyes.",
    sideEffects: ["Drowsiness", "Dry mouth", "Fatigue"],
    contraindications: ["Severe kidney disease"],
    price: 5.00,
    stock: 900,
  },
  {
    name: "Vitamin D3",
    genericName: "Cholecalciferol",
    category: "Vitamins & Supplements",
    form: "Capsule",
    strength: "1000IU",
    prescriptionRequired: false,
    manufacturer: "Generic",
    description: "Essential vitamin for bone health, immune function, and calcium absorption.",
    sideEffects: ["Nausea", "Vomiting", "Constipation"],
    contraindications: ["Hypercalcemia", "Kidney stones"],
    price: 4.50,
    stock: 1500,
  },
  {
    name: "Hydrocortisone",
    genericName: "Hydrocortisone",
    category: "Dermatology",
    form: "Cream",
    strength: "1%",
    prescriptionRequired: false,
    manufacturer: "Generic",
    description: "Topical corticosteroid used to treat skin inflammation, itching, and redness.",
    sideEffects: ["Skin irritation", "Burning", "Dryness"],
    contraindications: ["Viral skin infections", "Fungal infections"],
    price: 6.00,
    stock: 800,
  },
];

const seedMedications = async () => {
  try {
    // Connect to MongoDB
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI is not defined in .env file. Please set it.');
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing medications (optional - comment out if you want to keep existing)
    // await Medication.deleteMany({});
    // console.log('🗑️  Cleared existing medications');

    // Check for existing medications
    const existingCount = await Medication.countDocuments();
    if (existingCount > 0) {
      console.log(`⚠️  Found ${existingCount} existing medications in database.`);
      console.log('   Skipping seed to avoid duplicates.');
      console.log('   To re-seed, delete existing medications first or modify this script.');
      await mongoose.connection.close();
      process.exit(0);
    }

    // Insert medications
    const inserted = await Medication.insertMany(medications);
    console.log(`\n✅ Successfully seeded ${inserted.length} medications!`);
    console.log('\n📋 Seeded Medications:');
    inserted.forEach((med, index) => {
      console.log(`   ${index + 1}. ${med.name} (${med.genericName}) - ${med.category}`);
    });

    console.log('\n🎉 Medication seeding complete!');
    console.log('   You can now view these medications in the admin dashboard.');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding medications:', error.message);
    console.error(error);
    process.exit(1);
  }
};

seedMedications();

