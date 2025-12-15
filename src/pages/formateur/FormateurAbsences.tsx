import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Checkbox } from '../../components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Calendar } from '../../components/ui/calendar';
import { Paperclip, Save, CheckCircle } from 'lucide-react';

export function FormateurAbsences() {
  const [module, setModule] = useState('');
  const [groupe, setGroupe] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlot, setTimeSlot] = useState('');
  const [motif, setMotif] = useState('');

  const students = [
    { id: 1, name: 'Ahmed Bennani', matricule: 'ST2025001', absent: false, retard: false },
    { id: 2, name: 'Fatima Zahra El Amrani', matricule: 'ST2025002', absent: false, retard: false },
    { id: 3, name: 'Mohammed Alaoui', matricule: 'ST2025003', absent: false, retard: false },
    { id: 4, name: 'Sara Idrissi', matricule: 'ST2025004', absent: false, retard: false },
    { id: 5, name: 'Youssef Bennani', matricule: 'ST2025005', absent: false, retard: false },
    { id: 6, name: 'Amina Khalil', matricule: 'ST2025006', absent: false, retard: false },
    { id: 7, name: 'Omar Tazi', matricule: 'ST2025007', absent: false, retard: false },
    { id: 8, name: 'Nadia Rachidi', matricule: 'ST2025008', absent: false, retard: false },
  ];

  const [studentStatuses, setStudentStatuses] = useState(
    students.map(s => ({ ...s }))
  );

  const handleAbsenceChange = (id: number, checked: boolean) => {
    setStudentStatuses(prev =>
      prev.map(s => (s.id === id ? { ...s, absent: checked, retard: checked ? false : s.retard } : s))
    );
  };

  const handleRetardChange = (id: number, checked: boolean) => {
    setStudentStatuses(prev =>
      prev.map(s => (s.id === id ? { ...s, retard: checked, absent: checked ? false : s.absent } : s))
    );
  };

  const handleSave = () => {
    alert('Absences enregistrées avec succès!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900 dark:text-white mb-2">Enregistrer les absences</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Gérez les présences de vos stagiaires
        </p>
      </div>

      {/* Sélection de la séance */}
      <Card className="p-6">
        <h3 className="text-gray-900 dark:text-white mb-4">Informations de la séance</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Module</Label>
            <Select value={module} onValueChange={setModule}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un module" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="web">Développement Web Avancé</SelectItem>
                <SelectItem value="java">Programmation Java</SelectItem>
                <SelectItem value="tp">TP Programmation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Groupe</Label>
            <Select value={groupe} onValueChange={setGroupe}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un groupe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dd101">DD101</SelectItem>
                <SelectItem value="dd102">DD102</SelectItem>
                <SelectItem value="id101">ID101</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Date</Label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border dark:border-gray-800"
            />
          </div>

          <div className="space-y-2">
            <Label>Horaire</Label>
            <Select value={timeSlot} onValueChange={setTimeSlot}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez l'horaire" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="8-10">08:30 - 10:30</SelectItem>
                <SelectItem value="10-12">10:45 - 12:45</SelectItem>
                <SelectItem value="14-16">14:00 - 16:00</SelectItem>
                <SelectItem value="16-18">16:15 - 18:15</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Liste des stagiaires */}
      <Card className="p-6">
        <h3 className="text-gray-900 dark:text-white mb-4">
          Liste des stagiaires - Groupe {groupe || '...'}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-gray-800">
                <th className="text-left py-3 px-4 text-gray-900 dark:text-white">Matricule</th>
                <th className="text-left py-3 px-4 text-gray-900 dark:text-white">Nom complet</th>
                <th className="text-center py-3 px-4 text-gray-900 dark:text-white">Absence</th>
                <th className="text-center py-3 px-4 text-gray-900 dark:text-white">Retard</th>
              </tr>
            </thead>
            <tbody>
              {studentStatuses.map((student) => (
                <tr
                  key={student.id}
                  className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#232936]"
                >
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                    {student.matricule}
                  </td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white">
                    {student.name}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Checkbox
                      checked={student.absent}
                      onCheckedChange={(checked) =>
                        handleAbsenceChange(student.id, checked as boolean)
                      }
                    />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Checkbox
                      checked={student.retard}
                      onCheckedChange={(checked) =>
                        handleRetardChange(student.id, checked as boolean)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Informations complémentaires */}
      <Card className="p-6">
        <h3 className="text-gray-900 dark:text-white mb-4">Informations complémentaires</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="motif">Motif ou remarque (optionnel)</Label>
            <Textarea
              id="motif"
              placeholder="Ajouter un motif ou une remarque..."
              value={motif}
              onChange={(e) => setMotif(e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>Pièce jointe (optionnel)</Label>
            <Button type="button" variant="outline" className="w-full">
              <Paperclip className="w-4 h-4 mr-2" />
              Joindre un fichier
            </Button>
          </div>
        </div>
      </Card>

      {/* Résumé */}
      <Card className="p-6 bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800">
        <div className="flex items-start gap-4">
          <CheckCircle className="w-6 h-6 text-[#1E88E5] flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h4 className="text-gray-900 dark:text-white mb-2">Résumé</h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-600 dark:text-gray-400">Absents</p>
                <p className="text-gray-900 dark:text-white">
                  {studentStatuses.filter(s => s.absent).length} stagiaire(s)
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Retards</p>
                <p className="text-gray-900 dark:text-white">
                  {studentStatuses.filter(s => s.retard).length} stagiaire(s)
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Présents</p>
                <p className="text-gray-900 dark:text-white">
                  {studentStatuses.filter(s => !s.absent && !s.retard).length} stagiaire(s)
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Actions */}
      <div className="flex gap-3">
        <Button onClick={handleSave} size="lg" className="flex-1">
          <Save className="w-4 h-4 mr-2" />
          Enregistrer
        </Button>
        <Button variant="outline" size="lg" className="flex-1">
          Annuler
        </Button>
      </div>
    </div>
  );
}
