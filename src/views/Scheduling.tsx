import { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Filter,
  Plus,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface MeetingCardData {
  time: string;
  title: string;
  client: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled' | 'Completed';
  color: string;
}

const initialSchedule: Record<string, MeetingCardData[]> = {
  'Wed 15': [
    { time: '09:00 AM', title: 'Product Demo', client: 'Rahul Sharma', status: 'Confirmed', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
    { time: '11:00 AM', title: 'Consultation Call', client: 'Amit Verma', status: 'Confirmed', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { time: '02:00 PM', title: 'Solution Discussion', client: 'Neha Patel', status: 'Confirmed', color: 'bg-purple-50 text-purple-700 border-purple-200' },
    { time: '04:00 PM', title: 'Follow Up Call', client: 'Sneha Iyer', status: 'Pending', color: 'bg-amber-50 text-amber-700 border-amber-200' }
  ],
  'Thu 16': [
    { time: '10:00 AM', title: 'Pricing Discussion', client: 'Dinesh Kumar', status: 'Confirmed', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
    { time: '12:00 PM', title: 'Demo Call', client: 'Manish Jain', status: 'Pending', color: 'bg-amber-50 text-amber-700 border-amber-200' },
    { time: '03:00 PM', title: 'Product Walkthrough', client: 'Pooja Nair', status: 'Confirmed', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
    { time: '05:00 PM', title: 'Contract Review', client: 'Kavya Reddy', status: 'Cancelled', color: 'bg-rose-50 text-rose-700 border-rose-200' }
  ],
  'Fri 17': [
    { time: '09:30 AM', title: 'Strategy Call', client: 'Priya Mehta', status: 'Confirmed', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { time: '01:00 PM', title: 'Integration Demo', client: 'Rohit Gupta', status: 'Confirmed', color: 'bg-purple-50 text-purple-700 border-purple-200' },
    { time: '04:30 PM', title: 'Check-in Call', client: 'Sandeep Yadav', status: 'Pending', color: 'bg-amber-50 text-amber-700 border-amber-200' }
  ],
  'Sat 18': [
    { time: '11:00 AM', title: 'Technical Discussion', client: 'Vikram Patel', status: 'Pending', color: 'bg-amber-50 text-amber-700 border-amber-200' },
    { time: '02:30 PM', title: 'Onboarding Call', client: 'Anjali Singh', status: 'Confirmed', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' }
  ],
  'Sun 19': [],
  'Mon 20': [
    { time: '10:30 AM', title: 'Renewal Discussion', client: 'BrightCo', status: 'Confirmed', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { time: '01:30 PM', title: 'Training Session', client: 'Team Training', status: 'Confirmed', color: 'bg-purple-50 text-purple-700 border-purple-200' },
    { time: '04:00 PM', title: 'Follow Up', client: 'Rakesh Joshi', status: 'Pending', color: 'bg-amber-50 text-amber-700 border-amber-200' }
  ],
  'Tue 21': [
    { time: '09:00 AM', title: 'Demo Call', client: 'FutureX Solutions', status: 'Confirmed', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
    { time: '12:00 PM', title: 'Support Call', client: 'Alpha Tech', status: 'Cancelled', color: 'bg-rose-50 text-rose-700 border-rose-200' },
    { time: '03:30 PM', title: 'Project Discussion', client: 'Globex Corp', status: 'Confirmed', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' }
  ]
};

export default function Scheduling() {
  const [calendarView, setCalendarView] = useState<'week' | 'list'>('week');

  const daysOfWeek = [
    { key: 'Wed 15', label: 'Wed', date: 'May 15' },
    { key: 'Thu 16', label: 'Thu', date: 'May 16' },
    { key: 'Fri 17', label: 'Fri', date: 'May 17' },
    { key: 'Sat 18', label: 'Sat', date: 'May 18' },
    { key: 'Sun 19', label: 'Sun', date: 'May 19' },
    { key: 'Mon 20', label: 'Mon', date: 'May 20' },
    { key: 'Tue 21', label: 'Tue', date: 'May 21' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2 m-0">
            Scheduling
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Schedule meetings, demos and tasks with your leads and customers.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm text-xs font-semibold text-slate-600">
            <CalendarIcon size={14} className="text-slate-400" />
            <span>May 15, 2024 - May 21, 2024</span>
          </div>
          <button className="flex items-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 px-3.5 py-1.5 rounded-xl shadow-sm text-xs font-bold text-slate-700 transition-colors">
            <Filter size={14} />
            <span>Filter</span>
          </button>
          <button className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-1.5 rounded-xl shadow-md text-xs font-bold transition-all shadow-indigo-100">
            <Plus size={14} />
            <span>New Schedule</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { title: 'Total Schedules', val: '648', change: '+18.5%' },
          { title: 'Confirmed', val: '392', change: '+21.4%' },
          { title: 'Pending', val: '156', change: '-8.3%', negative: true },
          { title: 'Completed', val: '276', change: '+16.7%' },
          { title: 'Cancelled', val: '24', change: '-11.5%', negative: true },
          { title: 'No Show', val: '12', change: '-4.2%', negative: true }
        ].map((item, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{item.title}</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-base font-bold text-slate-800">{item.val}</span>
              <span className={`text-[9px] font-bold flex items-center gap-0.5 ${
                item.negative ? 'text-rose-500' : 'text-emerald-600'
              }`}>
                {item.negative ? '▼' : '▲'} {item.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid View */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Side: Calendar Grid */}
        <div className="flex-1 w-full bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          {/* Calendar Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex bg-slate-50 p-1 rounded-xl">
              <button
                onClick={() => setCalendarView('week')}
                className={`text-[10.5px] font-bold px-3 py-1 rounded-lg transition-all ${
                  calendarView === 'week' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'
                }`}
              >
                Calendar
              </button>
              <button
                onClick={() => setCalendarView('list')}
                className={`text-[10.5px] font-bold px-3 py-1 rounded-lg transition-all ${
                  calendarView === 'list' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'
                }`}
              >
                List
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
              <button className="p-1 hover:bg-slate-50 rounded"><ChevronLeft size={16} /></button>
              <button className="px-2.5 py-1 hover:bg-slate-50 rounded">Today</button>
              <button className="p-1 hover:bg-slate-50 rounded"><ChevronRight size={16} /></button>
              <span className="ml-2 font-extrabold text-slate-800 text-sm">May 15 – May 21, 2024</span>
            </div>

            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-xl text-xs text-slate-650 font-bold hover:bg-slate-100 transition-colors">
                <span>Team View</span>
                <ChevronRight size={12} className="rotate-90" />
              </button>
              <button className="p-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 rounded-xl transition-all">
                <Settings size={14} />
              </button>
            </div>
          </div>

          {/* Week Calendar Grid */}
          {calendarView === 'week' ? (
            <div className="grid grid-cols-7 gap-3 pt-2">
              {daysOfWeek.map((day) => {
                const meetings = initialSchedule[day.key] || [];
                const isToday = day.key === 'Tue 21';
                return (
                  <div key={day.key} className="flex flex-col min-h-[350px] bg-slate-50/50 rounded-2xl border border-slate-100 p-2 space-y-2">
                    <div className="text-center pb-2 border-b border-slate-200/50">
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">{day.label}</span>
                      <span className={`w-6 h-6 inline-flex items-center justify-center text-xs font-bold rounded-full mt-1 ${
                        isToday ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-700'
                      }`}>{day.date.split(' ')[1]}</span>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-2 max-h-[300px] pr-0.5">
                      {meetings.length > 0 ? (
                        meetings.map((meeting, i) => (
                          <div key={i} className={`p-2.5 rounded-xl border text-[10.5px] leading-tight flex flex-col justify-between ${meeting.color} shadow-sm`}>
                            <div>
                              <span className="font-bold block truncate">{meeting.title}</span>
                              <span className="text-[9px] opacity-75 block truncate mt-0.5">{meeting.client}</span>
                            </div>
                            <span className="text-[9px] font-bold mt-2.5 block opacity-60">{meeting.time}</span>
                          </div>
                        ))
                      ) : (
                        <div className="h-full flex items-center justify-center text-[10px] text-slate-350 italic text-center py-12">
                          No Schedules
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-2">
              {daysOfWeek.flatMap(d => (initialSchedule[d.key] || []).map((m, i) => (
                <div key={`${d.key}-${i}`} className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                    <div>
                      <span className="font-bold text-slate-800 block">{m.title}</span>
                      <span className="text-slate-450 block text-[10.5px] mt-0.5">{m.client}</span>
                    </div>
                  </div>
                  <span className="text-slate-400 font-bold">{d.date} • {m.time}</span>
                </div>
              )))}
            </div>
          )}
        </div>

        {/* Right Sidebar: calendar selectors */}
        <div className="w-full lg:w-80 bg-white border border-slate-200 rounded-2xl shadow-sm p-4 shrink-0 space-y-6">
          {/* Mini Calendar mockup */}
          <div>
            <div className="flex items-center justify-between text-xs mb-3 font-bold text-slate-800">
              <span className="text-slate-700">May 2024</span>
              <div className="flex gap-1">
                <button className="p-0.5 hover:bg-slate-50 rounded"><ChevronLeft size={14} /></button>
                <button className="p-0.5 hover:bg-slate-50 rounded"><ChevronRight size={14} /></button>
              </div>
            </div>
            {/* Grid */}
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-slate-500">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                <span key={d} className="font-bold py-1">{d}</span>
              ))}
              {/* Dummy dates */}
              {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => {
                const isSelected = date === 16;
                return (
                  <span key={date} className={`py-1 cursor-pointer rounded-full flex items-center justify-center w-5 h-5 mx-auto font-medium ${
                    isSelected ? 'bg-indigo-600 text-white font-bold' : 'hover:bg-slate-50'
                  }`}>
                    {date}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Upcoming Schedules list */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-800 text-sm m-0">Upcoming Schedules</h3>
              <button className="text-xs text-indigo-600 font-bold hover:underline">View All</button>
            </div>
            <div className="space-y-3 text-xs">
              {[
                { time: '10:00 AM', title: 'Pricing Discussion', client: 'Amit Verma', left: 'in 44m', col: 'text-indigo-600 bg-indigo-50 border-indigo-100' },
                { time: '12:00 PM', title: 'Demo Call', client: 'Manish Jain', left: 'in 2h 44m', col: 'text-amber-600 bg-amber-50 border-amber-100' },
                { time: '03:00 PM', title: 'Product Walkthrough', client: 'Pooja Nair', left: 'in 5h 44m', col: 'text-indigo-600 bg-indigo-50 border-indigo-100' }
              ].map((item, i) => (
                <div key={i} className={`flex justify-between items-center p-2.5 rounded-xl border ${item.col}`}>
                  <div>
                    <span className="font-bold block leading-none">{item.title}</span>
                    <span className="text-[10px] opacity-75 block mt-1.5">{item.client} • {item.time}</span>
                  </div>
                  <span className="text-[10px] font-bold shrink-0">{item.left}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI scheduling assistant block */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-100 flex gap-3 text-xs items-center relative overflow-hidden">
            <div className="flex-1">
              <h4 className="font-bold text-indigo-850 m-0 flex items-center gap-1">
                <Sparkles size={14} className="text-indigo-600" />
                AI Scheduling Assistant
              </h4>
              <p className="text-slate-600 text-[10.5px] mt-1.5 leading-relaxed">
                I can help you find the best time, avoid conflicts and send smart reminders.
              </p>
              <button className="mt-3 text-[10.5px] font-bold text-indigo-600 hover:underline">
                Optimize My Schedule →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
