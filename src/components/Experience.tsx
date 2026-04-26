import React from 'react';
import { motion } from 'motion/react';

const experiences = [
  { year: "2023 - Present", role: "Senior Fullstack Engineer", company: "ByteGen", desc: "Leading architectural decisions and primary maintenance of high-scale dApps." },
  { year: "2021 - 2023", role: "Fullstack Developer", company: "Nexus Sol.", desc: "Full-stack development with React, Node.js and AWS infrastructure management." },
  { year: "2019 - 2021", role: "UI Designer & Developer", company: "Spark Labs", desc: "Crafting intuitive interfaces and translating designs into robust React components." },
];

const Experience: React.FC = () => {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-6xl font-display mb-16"
      >
        Experience<span className="text-neutral-300">.</span>
      </motion.h2>

      <div className="space-y-12">
        {experiences.map((exp, idx) => (
          <motion.div
            key={exp.role}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex flex-col md:flex-row gap-8 pb-12 border-b border-neutral-100 items-baseline"
          >
            <div className="flex-none md:w-48">
              <span className="text-xl font-display font-medium text-neutral-400">{exp.year}</span>
            </div>
            <div className="flex-grow">
              <h3 className="text-3xl font-display mb-2">{exp.role}</h3>
              <p className="text-brand-accent font-medium mb-4">{exp.company}</p>
              <p className="text-neutral-500 font-sans max-w-2xl leading-relaxed">{exp.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
