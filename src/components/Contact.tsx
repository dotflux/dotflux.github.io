import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const contactRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-title",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-title",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".contact-desc",
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-desc",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".contact-form",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-form",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".contact-img",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-img",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, contactRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch(`https://formspree.io/f/mwpaerap`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _replyto: formData.email,
          _to: "dotflux56@gmail.com",
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        const data = await response.json();
        if (data.errors) {
          console.error("Form errors:", data.errors);
        }
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus("idle"), 5000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      ref={contactRef}
      id="contact"
      className="relative w-full min-h-screen flex flex-col md:flex-row items-center justify-center text-white overflow-hidden py-20 md:py-0"
    >
      <div className="md:ml-[50%] w-full md:w-1/2 flex flex-col justify-center items-start p-8 md:p-20 z-10">
        <h2 className="contact-title text-4xl md:text-6xl font-extrabold mb-4 md:mb-6">
          Get In Touch
        </h2>
        <p className="contact-desc text-lg text-gray-300 max-w-xl leading-relaxed mb-8 md:mb-12">
          Have a project or question in mind or want to collaborate? I'd love to
          hear from you. Send me a message and I'll respond as soon as possible.
        </p>

        <form
          onSubmit={handleSubmit}
          className="contact-form w-full max-w-xl space-y-6"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300"
              placeholder="Your name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300 resize-none"
              placeholder="Your message..."
            />
          </div>

          {submitStatus === "success" && (
            <div className="px-4 py-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-sm">
              Message sent successfully! I'll get back to you soon.
            </div>
          )}

          {submitStatus === "error" && (
            <div className="px-4 py-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
              Failed to send message. Please try again or email me directly at
              dotflux56@gmail.com
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-3 bg-white text-black font-semibold text-base rounded-lg shadow-lg transition-all duration-200 hover:bg-gray-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      <div className="md:absolute md:left-0 md:top-0 md:w-1/2 w-full h-[50vh] md:h-full flex items-center justify-center">
        <img
          src="storyset_3.svg"
          alt="Contact Illustration"
          width={700}
          height={700}
          className="contact-img object-contain w-[350px] md:w-[500px] h-auto"
        />
      </div>
    </section>
  );
};

export default Contact;
