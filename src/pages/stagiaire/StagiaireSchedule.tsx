import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Download, Calendar as CalendarIcon } from 'lucide-react';

export function StagiaireSchedule() {
  const schedule = {
    lundi: [
      { time: '08:30-10:30', module: 'Programmation Java', formateur: 'Prof. Bennani', salle: 'A201' },
      { time: '10:45-12:45', module: 'Base de données', formateur: 'Prof. El Amrani', salle: 'A203' },
      { time: '14:00-16:00', module: 'TP Java', formateur: 'Prof. Bennani', salle: 'Lab 1' },
    ],
    mardi: [
      { time: '08:30-10:30', module: 'Développement Web', formateur: 'Prof. Idrissi', salle: 'A202' },
      { time: '10:45-12:45', module: 'Anglais technique', formateur: 'Prof. Smith', salle: 'B101' },
      { time: '14:00-16:00', module: 'TP Web', formateur: 'Prof. Idrissi', salle: 'Lab 2' },
    ],
    mercredi: [
      { time: '08:30-10:30', module: 'Réseaux informatiques', formateur: 'Prof. Alaoui', salle: 'A204' },
      { time: '10:45-12:45', module: 'Projet', formateur: 'Équipe pédagogique', salle: 'Lab 3' },
    ],
    jeudi: [
      { time: '08:30-10:30', module: 'Base de données', formateur: 'Prof. El Amrani', salle: 'A203' },
      { time: '10:45-12:45', module: 'TP Base de données', formateur: 'Prof. El Amrani', salle: 'Lab 1' },
      { time: '14:00-16:00', module: 'Développement Web', formateur: 'Prof. Idrissi', salle: 'A202' },
    ],
    vendredi: [
      { time: '08:30-10:30', module: 'Programmation Java', formateur: 'Prof. Bennani', salle: 'A201' },
      { time: '10:45-12:45', module: 'Réseaux informatiques', formateur: 'Prof. Alaoui', salle: 'A204' },
    ],
  };

  const days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi'];
  const daysLabels = {
    lundi: 'Lundi',
    mardi: 'Mardi',
    mercredi: 'Mercredi',
    jeudi: 'Jeudi',
    vendredi: 'Vendredi',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 dark:text-white mb-2">Emploi du temps</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Semaine du 3 au 7 Mars 2025
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <CalendarIcon className="w-4 h-4 mr-2" />
            Changer de semaine
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Télécharger PDF
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {days.map((day) => (
          <Card key={day} className="overflow-hidden">
            <div className="bg-[#1E88E5] text-white px-6 py-3">
              <h3 className="text-white">{daysLabels[day as keyof typeof daysLabels]}</h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {schedule[day as keyof typeof schedule].map((course, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-[#232936] rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="w-24 text-center">
                      <p className="text-sm text-gray-900 dark:text-white">
                        {course.time}
                      </p>
                    </div>
                    <div className="flex-1 grid md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Module</p>
                        <p className="text-gray-900 dark:text-white">{course.module}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Formateur</p>
                        <p className="text-gray-900 dark:text-white">{course.formateur}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Salle</p>
                        <p className="text-gray-900 dark:text-white">{course.salle}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
