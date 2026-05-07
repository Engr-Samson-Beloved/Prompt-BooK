import { jsPDF } from "jspdf";
import { NeuralBlueprint } from "../gemini";

export const generateBrandConstitution = (blueprint: NeuralBlueprint) => {
  const doc = new jsPDF();
  const primaryColor = blueprint.design_tokens?.colors[0] || "#ffcc00";

  // Title Page
  doc.setFillColor(0, 0, 0);
  doc.rect(0, 0, 210, 297, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(40);
  doc.text("BRAND CONSTITUTION", 20, 60);
  
  doc.setTextColor(primaryColor);
  doc.setFontSize(24);
  doc.text(blueprint.product_name?.toUpperCase() || "NEW VENTURE", 20, 80);
  
  doc.setTextColor(150, 150, 150);
  doc.setFontSize(12);
  doc.setFont("courier", "normal");
  doc.text(`DESIGNATION ID: ${Math.random().toString(36).substring(7).toUpperCase()}`, 20, 100);
  doc.text(`TIMESTAMP: ${new Date().toLocaleString()}`, 20, 110);

  // Second Page: Mission & Gap
  doc.addPage();
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("1. CORE ARCHITECTURE", 20, 30);
  
  doc.setFontSize(14);
  doc.text("Mission Statement", 20, 50);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  const missionLines = doc.splitTextToSize(blueprint.mission_statement || "", 170);
  doc.text(missionLines, 20, 60);
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Market Scarcity Analysis", 20, 90);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  const gapLines = doc.splitTextToSize(blueprint.market_gap || "", 170);
  doc.text(gapLines, 20, 100);

  // Third Page: Neural Target
  doc.addPage();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("2. NEURAL TARGETING", 20, 30);
  
  doc.setFontSize(14);
  doc.text("Persona Profile", 20, 50);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(`Primary Node: ${blueprint.psychographics?.persona}`, 20, 60);
  
  doc.setFont("helvetica", "bold");
  doc.text("Psychological Pain Points", 20, 80);
  doc.setFont("helvetica", "normal");
  blueprint.psychographics?.pain_points.forEach((point, i) => {
    doc.text(`- ${point}`, 20, 90 + (i * 7));
  });

  // Save the PDF
  doc.save(`${blueprint.product_name?.replace(/\s+/g, '_')}_Constitution.pdf`);
};
