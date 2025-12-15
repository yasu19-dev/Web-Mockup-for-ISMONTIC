import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Calendar } from '../../components/ui/calendar';
import { CalendarCheck, Clock, FileText, CheckCircle } from 'lucide-react';

export function StagiaireAppointments() {
  const [step, setStep] = useState(1);
  const [service, setService] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlot, setTimeSlot] = useState('');

  const services = [
    { value: 'scolarite', label: 'Attestation de scolarité' },
    { value: 'stage', label: 'Attestation de stage' },
    { value: 'notes', label: 'Relevé de notes' },
    { value: 'orientation', label: 'Orientation professionnelle' },
  ];

  const timeSlots = [
    '09:00 - 09:30',
    '09:30 - 10:00',
    '10:00 - 10:30',
    '10:30 - 11:00',
    '11:00 - 11:30',
    '14:00 - 14:30',
    '14:30 - 15:00',
    '15:00 - 15:30',
    '15:30 - 16:00',
  ];

  const handleConfirm = () => {
    setStep(4);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900 dark:text-white mb-2">Rendez-vous</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Prenez rendez-vous pour vos demandes d'attestations
        </p>
      </div>

      {/* Stepper */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= s
                    ? 'bg-[#1E88E5] text-white'
                    : 'bg-gray-200 dark:bg-[#232936] text-gray-500'
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    step > s ? 'bg-[#1E88E5]' : 'bg-gray-200 dark:bg-[#232936]'
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-[#1E88E5]/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-[#1E88E5]" />
              </div>
              <div>
                <h3 className="text-gray-900 dark:text-white">Choisir le service</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Sélectionnez le type d'attestation souhaité
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Type de service</Label>
              <Select value={service} onValueChange={setService}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-2 gap-4 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-200 dark:border-blue-800">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Délai de traitement</p>
                <p className="text-gray-900 dark:text-white">2-3 jours ouvrables</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Documents requis</p>
                <p className="text-gray-900 dark:text-white">Carte d'identité</p>
              </div>
            </div>

            <Button
              onClick={() => setStep(2)}
              disabled={!service}
              className="w-full"
              size="lg"
            >
              Continuer
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-[#00C9A7]/10 flex items-center justify-center">
                <CalendarCheck className="w-6 h-6 text-[#00C9A7]" />
              </div>
              <div>
                <h3 className="text-gray-900 dark:text-white">Choisir la date</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Sélectionnez un jour disponible
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border dark:border-gray-800"
              />
            </div>

            <div className="flex gap-3">
              <Button onClick={() => setStep(1)} variant="outline" className="flex-1">
                Retour
              </Button>
              <Button onClick={() => setStep(3)} disabled={!date} className="flex-1" size="lg">
                Continuer
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h3 className="text-gray-900 dark:text-white">Choisir l'horaire</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Sélectionnez un créneau disponible
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {timeSlots.map((slot) => (
                <Button
                  key={slot}
                  variant={timeSlot === slot ? 'default' : 'outline'}
                  onClick={() => setTimeSlot(slot)}
                  className="h-auto py-4"
                >
                  {slot}
                </Button>
              ))}
            </div>

            <div className="p-4 bg-gray-50 dark:bg-[#232936] rounded-lg space-y-2">
              <h4 className="text-gray-900 dark:text-white">Récapitulatif</h4>
              <div className="space-y-1 text-sm">
                <p className="text-gray-600 dark:text-gray-400">
                  Service: <span className="text-gray-900 dark:text-white">
                    {services.find(s => s.value === service)?.label}
                  </span>
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Date: <span className="text-gray-900 dark:text-white">
                    {date?.toLocaleDateString('fr-FR')}
                  </span>
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Horaire: <span className="text-gray-900 dark:text-white">{timeSlot || 'Non sélectionné'}</span>
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={() => setStep(2)} variant="outline" className="flex-1">
                Retour
              </Button>
              <Button onClick={handleConfirm} disabled={!timeSlot} className="flex-1" size="lg">
                Confirmer
              </Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="text-center py-8 space-y-6">
            <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
              <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-gray-900 dark:text-white mb-2">Rendez-vous confirmé!</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Votre demande a été enregistrée avec succès
              </p>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-[#232936] rounded-lg max-w-md mx-auto space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Service:</span>
                <span className="text-gray-900 dark:text-white">
                  {services.find(s => s.value === service)?.label}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Date:</span>
                <span className="text-gray-900 dark:text-white">{date?.toLocaleDateString('fr-FR')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Horaire:</span>
                <span className="text-gray-900 dark:text-white">{timeSlot}</span>
              </div>
            </div>
            <Button
              onClick={() => {
                setStep(1);
                setService('');
                setTimeSlot('');
              }}
              variant="outline"
            >
              Prendre un autre rendez-vous
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
