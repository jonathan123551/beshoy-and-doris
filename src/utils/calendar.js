/**
 * Calendar Utility
 * Generates a downloadable .ics calendar event file
 */

export function generateICS(config) {
  const { groomName, brideName, date, time, church } = config;

  const eventTitle = `Wedding of ${groomName} & ${brideName}`;
  const location = `${church.name}, ${church.area}`;

  // Parse date and time
  const [year, month, day] = date.split('-');
  const [hour, minute] = time.split(':');

  // Create start date in UTC (Cairo is UTC+2, but we'll use local time format)
  const startDate = `${year}${month}${day}T${hour}${minute}00`;
  // End time: 4 hours after start
  const endHour = String(parseInt(hour) + 4).padStart(2, '0');
  const endDate = `${year}${month}${day}T${endHour}${minute}00`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `DTSTART;TZID=Africa/Cairo:${startDate}`,
    `DTEND;TZID=Africa/Cairo:${endDate}`,
    `SUMMARY:${eventTitle}`,
    `DESCRIPTION:You are invited to the wedding ceremony and reception of ${groomName} & ${brideName}.`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    `UID:${Date.now()}@wedding-invitation`,
    'BEGIN:VALARM',
    'TRIGGER:-PT1H',
    'ACTION:DISPLAY',
    `DESCRIPTION:${eventTitle} starts in 1 hour`,
    'END:VALARM',
    'END:VEVENT',
    'BEGIN:VTIMEZONE',
    'TZID:Africa/Cairo',
    'BEGIN:STANDARD',
    'DTSTART:19700101T000000',
    'TZOFFSETFROM:+0200',
    'TZOFFSETTO:+0200',
    'TZNAME:EET',
    'END:STANDARD',
    'END:VTIMEZONE',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${groomName}-and-${brideName}-Wedding.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
