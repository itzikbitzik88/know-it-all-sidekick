import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const AccessibilityStatement = () => {
  return (
    <main id="main-content" className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6 text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
        >
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
          חזרה לצ'אט
        </Link>

        <article className="bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-border">
          <h1 className="text-3xl font-bold text-foreground mb-6">הצהרת נגישות</h1>
          
          <section className="space-y-6 text-foreground leading-relaxed">
            <div>
              <h2 className="text-xl font-semibold mb-3">מחויבות לנגישות</h2>
              <p className="text-lg">
                אתר גפן צ'אט מחויב להנגשת השירותים שלו לכלל הציבור, לרבות אנשים עם מוגבלות, 
                בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), 
                התשע"ג-2013, ובהתאם לתקן הישראלי ת"י 5568.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">אופן ההנגשה</h2>
              <p className="text-lg mb-3">האתר הונגש בהתאם לתקן הישראלי 5568 חלק 1, הכולל:</p>
              <ul className="list-disc list-inside space-y-2 text-lg me-4">
                <li>תמיכה מלאה בקוראי מסך ובטכנולוגיות מסייעות</li>
                <li>ניווט מלא באמצעות מקלדת בלבד</li>
                <li>קישור "דלג לתוכן" בראש כל עמוד</li>
                <li>שימוש בתגיות ARIA לזיהוי אזורים ופעולות</li>
                <li>ניגודיות צבעים מספקת בין טקסט לרקע</li>
                <li>גופנים בגודל קריא (בסיס 16 פיקסלים) עם יכולת הגדלה</li>
                <li>תמיכה מלאה בכתיב מימין לשמאל (RTL)</li>
                <li>מבנה סמנטי תקין של כותרות ואזורים</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">דפדפנים וטכנולוגיות נתמכים</h2>
              <p className="text-lg">
                האתר נבדק ותואם לעבודה עם הדפדפנים הנפוצים (Chrome, Firefox, Safari, Edge) 
                ועם קוראי המסך NVDA ו-JAWS. האתר מותאם לצפייה במכשירים ניידים.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">רכיבים שלא הונגשו</h2>
              <p className="text-lg">
                נכון למועד פרסום הצהרה זו, כלל רכיבי האתר הונגשו. 
                במידה ותיתקלו ברכיב שאינו נגיש, נשמח לשמוע ולתקן בהקדם.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">יצירת קשר בנושא נגישות</h2>
              <p className="text-lg mb-3">
                נתקלתם בבעיית נגישות? נשמח לקבל משוב ולטפל בכל פנייה. 
                ניתן לפנות אלינו בכל אחת מהדרכים הבאות:
              </p>
              <ul className="space-y-2 text-lg me-4">
                <li>
                  <strong>דוא"ל: </strong>
                  <a 
                    href="mailto:accessibility@gefen-chat.co.il" 
                    className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded"
                  >
                    accessibility@gefen-chat.co.il
                  </a>
                </li>
                <li>
                  <strong>טלפון: </strong>
                  <a 
                    href="tel:+972-3-1234567" 
                    className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded"
                    dir="ltr"
                  >
                    03-1234567
                  </a>
                </li>
                <li>
                  <strong>כתובת: </strong>
                  רחוב הדוגמה 1, תל אביב
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">תאריך עדכון ההצהרה</h2>
              <p className="text-lg">
                הצהרה זו עודכנה לאחרונה בתאריך: ינואר 2025
              </p>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
};
