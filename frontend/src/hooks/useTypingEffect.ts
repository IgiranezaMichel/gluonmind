import { useState, useEffect, useRef } from "react";

const services = [
  "IT Consulting",
  "SaaS Solutions",
  "Mobile App Development",
  "Web Applications",
  "Cloud Deployment",
  "App Migration",
  "Automated Backup Systems",
  "AI Solutions for Businesses",
];

export const useTypingEffect = () => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    const current = services[indexRef.current];
    let timeout: number;

    if (!isDeleting) {
      if (text.length < current.length) {
        timeout = window.setTimeout(() => setText(current.slice(0, text.length + 1)), 60 + Math.random() * 40);
      } else {
        timeout = window.setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (text.length > 0) {
        timeout = window.setTimeout(() => setText(text.slice(0, -1)), 30);
      } else {
        setIsDeleting(false);
        indexRef.current = (indexRef.current + 1) % services.length;
      }
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting]);

  return text;
};
