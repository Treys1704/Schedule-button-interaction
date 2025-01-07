import { CalendarDays, ChevronDown, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface ScheduleDetailsProps{
    onClose: () => void;
}

const styles = {
    container: "relative w-full min-h-screen flex items-start md:items-center justify-center px-4 py-10",
    box: "border w-80 relative z-10 bg-white rounded-[25px]",
    textarea: "w-full p-2 bg-white outline-none resize-none",
    scheduleButton: "bg-zinc-900 py-2 px-8 text-white rounded-[25px]",
    calendarButton: "size-10 flex items-center justify-center border bg-slate-100 rounded-[25px] transition-opacity duration-300",
    scheduleContainer: "absolute inset-0 size-full flex items-center justify-center p-2",
    footer: "w-full flex items-center justify-center bg-slate-100 border rounded-tl-none rounded-tr-none rounded-[25px] absolute -bottom-10 p-3 pt-8",
};

const ScheduleDetails = ({ onClose }: ScheduleDetailsProps) => (
    <motion.div
        className="px-2 absolute top-0 w-full"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
    >
        <div className="border rounded-full overflow-hidden h-10 flex items-center justify-between bg-slate-100">
            <div className="bg-white w-[90%] rounded-full flex items-center justify-between">
                <div className="border-r h-10 w-full flex items-center justify-between p-2">
                    <span className="text-sm">08, Jan 2025</span>
                    <ChevronDown size={20} />
                </div>
                <div className="h-10 w-full flex items-center justify-between p-2">
                    <span className="text-sm">12:00 AM</span>
                    <ChevronDown size={20} />
                </div>
            </div>
            <button
                className="h-10 w-10 flex items-center justify-center"
                onClick={onClose}
            >
                <X size={20} />
            </button>
        </div>
    </motion.div>
);

const FooterMessage = () => (
    <motion.div
        initial={{ opacity: 0, y: -62 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -62 }}
        className={styles.footer}
    >
        <p className="text-xs font-medium text-zinc-500">Will be posted on 08 Jan 2025 at 12:00 AM</p>
    </motion.div>
);

export default function App() {
    const [open, setOpen] = useState(false);

    return (
        <main className={styles.container}>
            <div className="relative">
                <div className={styles.box}>
                    <div className="p-2">
                        <textarea
                            placeholder="What's happening?"
                            className={styles.textarea}
                        />
                    </div>
                    <div className="pt-10 relative">
                        <AnimatePresence>
                            {open && <ScheduleDetails onClose={() => setOpen(false)} />}
                        </AnimatePresence>
                        <div className="flex items-center justify-end p-2 gap-2 relative">
                            <motion.button
                                className={styles.calendarButton}
                                style={{ opacity: open ? 0 : 1 }}
                                onClick={() => setOpen(true)}
                            >
                                <CalendarDays />
                            </motion.button>
                            <motion.button
                                className={styles.scheduleButton}
                                layoutId="schedule"
                            >
                                Post
                            </motion.button>
                            <AnimatePresence>
                                {open && (
                                    <div className={styles.scheduleContainer}>
                                        <motion.button
                                            layoutId="schedule"
                                            className={`${styles.scheduleButton} w-full`}
                                        >
                                            Schedule
                                        </motion.button>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
                <AnimatePresence>
                    {open && <FooterMessage />}
                </AnimatePresence>
            </div>
        </main>
    );
}
