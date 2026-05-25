import { jsPDF } from "jspdf";
import { NeuralBlueprint } from "../gemini";

export const generateBrandConstitution = (blueprint: NeuralBlueprint) => {
  const doc = new jsPDF();
  const primaryColor = blueprint.design_tokens?.colors?.[0] || "#ffcc00";

  // Page 1: Title Page
  doc.setFillColor(17, 17, 17); // Sleek dark slate instead of pitch black
  doc.rect(0, 0, 210, 297, 'F');
  
  // Decorative lines
  doc.setDrawColor(primaryColor);
  doc.setLineWidth(1);
  doc.line(20, 40, 190, 40);
  doc.line(20, 250, 190, 250);

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(36);
  doc.text("BRAND CONSTITUTION", 20, 80);
  
  doc.setTextColor(primaryColor);
  doc.setFontSize(28);
  doc.text(blueprint.product_name?.toUpperCase() || "NEW VENTURE", 20, 100);
  
  doc.setTextColor(150, 150, 150);
  doc.setFontSize(10);
  doc.setFont("courier", "normal");
  doc.text(`DESIGNATION ID: ${Math.random().toString(36).substring(7).toUpperCase()}`, 20, 210);
  doc.text(`TIMESTAMP: ${new Date().toLocaleString()}`, 20, 220);
  doc.text("POWERED BY PROMPTBOOK NEURAL CORE v4.2.0", 20, 230);

  // Page 2: Core Architecture & Scarcity
  doc.addPage();
  doc.setTextColor(17, 17, 17);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("1. CORE ARCHITECTURE", 20, 30);
  
  // Divider
  doc.setDrawColor(230, 230, 230);
  doc.line(20, 35, 190, 35);

  doc.setFontSize(14);
  doc.text("Mission Statement", 20, 55);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(11);
  doc.setTextColor(80, 80, 80);
  const missionLines = doc.splitTextToSize(blueprint.mission_statement || "", 170);
  doc.text(missionLines, 20, 65);
  
  doc.setTextColor(17, 17, 17);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Market Scarcity Analysis", 20, 110);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(80, 80, 80);
  const gapLines = doc.splitTextToSize(blueprint.market_gap || "", 170);
  doc.text(gapLines, 20, 120);

  // Page 3: Neural Targeting
  doc.addPage();
  doc.setTextColor(17, 17, 17);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("2. NEURAL TARGETING", 20, 30);
  doc.line(20, 35, 190, 35);
  
  doc.setFontSize(14);
  doc.text("Persona Profile", 20, 55);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(80, 80, 80);
  const personaText = `Primary Node: ${blueprint.psychographics?.persona || "Dynamic User Node"}`;
  const personaLines = doc.splitTextToSize(personaText, 170);
  doc.text(personaLines, 20, 65);
  
  doc.setTextColor(17, 17, 17);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Psychological Pain Points", 20, 110);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 80);
  const painPoints = blueprint.psychographics?.pain_points || [];
  if (painPoints.length > 0) {
    painPoints.forEach((point, i) => {
      doc.text(`- ${point}`, 20, 120 + (i * 8));
    });
  } else {
    doc.text("- No mapped points detected.", 20, 120);
  }

  doc.setTextColor(17, 17, 17);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Core Emotional Triggers", 20, 180);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 80);
  const triggers = blueprint.psychographics?.triggers || [];
  if (triggers.length > 0) {
    triggers.forEach((trigger, i) => {
      doc.text(`- ${trigger}`, 20, 190 + (i * 8));
    });
  } else {
    doc.text("- No mapped triggers detected.", 20, 190);
  }

  // Page 4: Technical DNA
  doc.addPage();
  doc.setTextColor(17, 17, 17);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("3. TECHNICAL DNA", 20, 30);
  doc.line(20, 35, 190, 35);

  doc.setFontSize(14);
  doc.text("Architecture Stack", 20, 55);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(80, 80, 80);
  doc.text(`Frontend: ${blueprint.technical_stack?.frontend || "Not Specified"}`, 20, 65);
  doc.text(`Backend: ${blueprint.technical_stack?.backend || "Not Specified"}`, 20, 73);
  doc.text(`Database: ${blueprint.technical_stack?.database || "Not Specified"}`, 20, 81);

  doc.setTextColor(17, 17, 17);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Recommended Schema Snapshot", 20, 105);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 80);
  const schemas = blueprint.technical_stack?.schema || [];
  if (schemas.length > 0) {
    schemas.forEach((schema, i) => {
      const schemaLines = doc.splitTextToSize(`* ${schema}`, 170);
      doc.text(schemaLines, 20, 115 + (i * 12));
    });
  } else {
    doc.text("- No schema snapshot provided.", 20, 115);
  }

  // Page 5: Monetization & Roadmaps
  doc.addPage();
  doc.setTextColor(17, 17, 17);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("4. MONETIZATION & DEPLOYMENT ROADMAP", 20, 30);
  doc.line(20, 35, 190, 35);

  doc.setFontSize(14);
  doc.text("Model & Pricing Tiers", 20, 55);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(80, 80, 80);
  doc.text(`Primary Model: ${blueprint.monetization?.model || "Not Specified"}`, 20, 65);
  const pricingTiers = blueprint.monetization?.pricing_tiers || [];
  doc.text(`Pricing Tiers: ${pricingTiers.join(" | ") || "Not Specified"}`, 20, 73);

  doc.setTextColor(17, 17, 17);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Go-To-Market Execution", 20, 95);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 80);
  const gtmStrategies = blueprint.monetization?.gtm_strategy || [];
  if (gtmStrategies.length > 0) {
    gtmStrategies.forEach((gtm, i) => {
      doc.text(`- ${gtm}`, 20, 105 + (i * 8));
    });
  } else {
    doc.text("- No GTM strategy mapped.", 20, 105);
  }

  doc.setTextColor(17, 17, 17);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Development Timeline", 20, 160);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 80);
  const roadmapPhases = blueprint.roadmap || [];
  if (roadmapPhases.length > 0) {
    roadmapPhases.forEach((phase: any, i) => {
      const name = typeof phase === 'object' ? (phase.name || phase.phase) : `Phase ${i + 1}`;
      const desc = typeof phase === 'object' ? (phase.description || phase.goal) : phase;
      const phaseLines = doc.splitTextToSize(`[${name}] ${desc}`, 170);
      doc.text(phaseLines, 20, 170 + (i * 12));
    });
  } else {
    doc.text("- No roadmap timeline generated.", 20, 170);
  }

  // Save the PDF
  doc.save(`${blueprint.product_name?.replace(/\s+/g, '_')}_Constitution.pdf`);
};
