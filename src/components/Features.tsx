import {
  Bell,
  Check,
  Copy,
  FileText,
  Hand,
  Image as ImageIcon,
  Lock,
  MicOff,
  MonitorUp,
  Paperclip,
  UserCheck,
} from 'lucide-react';
import { EndStop } from './EndStop';
import { SectionHead } from './SectionHead';

const PENS = [
  'black',
  'grey',
  'blue',
  'red',
  'green',
  'orange',
  'purple',
  'pink',
  'brown',
  'teal',
  'yellow',
  'white',
];

/** Bento grid: each card has a small, live-looking piece of the real app. */
export function Features() {
  return (
    <section className="sec" id="features">
      <SectionHead
        eyebrow="Everything in one place"
        title={
          <>
            One <EndStop>classroom</EndStop>{' '}
            <span className="hi">
              Every tool a tutor <EndStop>needs</EndStop>
            </span>
          </>
        }
      />

      <div className="bento">
        <article className="bento__card bento__card--wide" data-reveal>
          <div className="bento__copy">
            <h3>Live classes that feel like your classroom</h3>
            <p>
              You decide who comes in, who speaks and who shares a screen. Mute, spotlight or remove
              anyone in one click. And teach until the lesson is done, not until a timer says so.
            </p>
          </div>
          <div className="mini mini--people" aria-hidden>
            <div className="mini__head">
              <strong>Algebra Masterclass</strong>
              <span className="badge badge--live">
                <i /> Live
              </span>
            </div>
            <div className="person">
              <span className="avatar" style={{ background: 'var(--tint-sky)' }}>
                KV
              </span>
              <span className="person__name">
                Kavin{' '}
                <em className="person__flag person__flag--hand">
                  <Hand size={11} /> Hand up
                </em>
              </span>
              <span className="mini__btn mini__btn--lime">Spotlight</span>
            </div>
            <div className="person">
              <span className="avatar" style={{ background: 'var(--tint-peach)' }}>
                AM
              </span>
              <span className="person__name">
                Amaya{' '}
                <em className="person__flag">
                  <MonitorUp size={11} /> Wants to share
                </em>
              </span>
              <span className="mini__btn">Allow</span>
            </div>
            <div className="person">
              <span className="avatar" style={{ background: 'var(--tint-mint)' }}>
                IS
              </span>
              <span className="person__name">
                Ishan{' '}
                <em className="person__flag">
                  <MicOff size={11} /> Muted
                </em>
              </span>
              <span className="mini__btn">Remove</span>
            </div>
          </div>
        </article>

        <article className="bento__card" data-reveal>
          <div className="mini mini--rec" aria-hidden>
            <span className="rec-btn">
              <i />
            </span>
            <span className="rec-time">00:42:18</span>
            <span className="chip chip--lavender">
              <Lock size={12} /> Private
            </span>
          </div>
          <div className="bento__copy">
            <h3>Record in one click. Private by default.</h3>
            <p>
              Press record and the board fills the video, with you beside it. Nobody sees it until
              you share it.
            </p>
          </div>
        </article>

        <article className="bento__card" data-reveal>
          <div className="mini mini--remind" aria-hidden>
            {['24 hours', '1 hour', '15 minutes'].map((t) => (
              <div key={t} className="notif">
                <span className="notif__icon">
                  <Bell size={13} />
                </span>
                <span>
                  <strong>Algebra Masterclass</strong> starts in {t}
                </span>
              </div>
            ))}
            <span className="mini__btn mini__btn--lime">
              <Copy size={12} /> Copy for WhatsApp
            </span>
          </div>
          <div className="bento__copy">
            <h3>Reminders that send themselves</h3>
            <p>
              24 hours, 1 hour and 15 minutes before class, by email and phone notification, in each
              student&rsquo;s own time zone. Plus a ready-made WhatsApp message you post in one tap.
            </p>
          </div>
        </article>

        <article className="bento__card bento__card--wide" data-reveal>
          <div className="bento__copy">
            <h3>Write on your tute, live</h3>
            <p>
              Open your PDF tute or past paper on the board and work through it with your class,
              page by page. Graph paper, equations, 12 pen colours and a chalkboard when you want
              it.
            </p>
          </div>
          <div className="mini mini--paper" aria-hidden>
            <p className="paper__q">
              <b>Q3.</b> Solve x² − 5x + 6 = 0
            </p>
            <p className="paper__hand">(x − 2)(x − 3) = 0</p>
            <p className="paper__hand paper__hand--hl">x = 2 or x = 3</p>
            <span className="pens">
              {PENS.map((p) => (
                <i key={p} style={{ background: `var(--board-pen-${p})` }} />
              ))}
            </span>
          </div>
        </article>

        <article className="bento__card" data-reveal>
          <div className="mini mini--files" aria-hidden>
            <div className="file">
              <FileText size={16} /> Past paper 2025.pdf
            </div>
            <div className="file">
              <FileText size={16} /> Week 6 worksheet.pdf
            </div>
            <div className="file">
              <ImageIcon size={16} /> Formula sheet.png
            </div>
            <span className="chip chip--lime">
              <Paperclip size={12} /> Attached to today&rsquo;s class
            </span>
          </div>
          <div className="bento__copy">
            <h3>Every file in one place</h3>
            <p>
              Notes, worksheets, past papers and announcements live with the class. No more
              &ldquo;Sir, can you send it again?&rdquo;
            </p>
          </div>
        </article>

        <article className="bento__card" data-reveal>
          <div className="mini mini--attend" aria-hidden>
            <div className="attend__top">
              <strong>24 joined</strong>
              <span>avg 58 min</span>
            </div>
            <span className="attend__bars">
              {[55, 80, 65, 92, 74, 100, 86, 95].map((h, i) => (
                <i key={i} style={{ height: `${h}%` }} />
              ))}
            </span>
          </div>
          <div className="bento__copy">
            <h3>Attendance takes itself</h3>
            <p>Who joined, when, and for how long. Every class. No roll call.</p>
          </div>
        </article>

        <article className="bento__card" data-reveal>
          <div className="mini mini--wait" aria-hidden>
            <div className="mini__head">
              <strong>Waiting room</strong>
              <span className="chip chip--lavender">
                <Lock size={12} /> Locked
              </span>
            </div>
            <div className="person">
              <span className="avatar" style={{ background: 'var(--tint-rose)' }}>
                SR
              </span>
              <span className="person__name">Sara</span>
              <span className="mini__btn mini__btn--lime">
                <UserCheck size={12} /> Admit
              </span>
            </div>
            <div className="person">
              <span className="avatar" style={{ background: 'var(--chip)' }}>
                ?
              </span>
              <span className="person__name">Unknown guest</span>
              <span className="mini__btn">Deny</span>
            </div>
          </div>
          <div className="bento__copy">
            <h3>Only your students get in</h3>
            <p>
              Approve new students, add a passcode, use a waiting room and lock the room once class
              starts.
            </p>
          </div>
        </article>

        <article className="bento__card bento__card--cta" data-reveal>
          <Check size={28} />
          <h3>
            Six apps, <span className="hi">one link.</span>
          </h3>
          <p>Live class, board, files, recordings, reminders and attendance.</p>
        </article>
      </div>
    </section>
  );
}
