import { Component, OnInit, ViewChild } from '@angular/core';
import { WorkOutPlan } from './_models/WorkOutPlan';
import { Oefening } from './_models/oefening';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'fitness-app';
  workoutPlan: WorkOutPlan = new WorkOutPlan();
  totalWorkoutTime = 0;
  totalTimeLeft: number;
  currentExercise: number;
  timeLeftCurrentExercise: number;
  timeLeftForRest: number;
  isResting: boolean;
  progressValue;
  timer: any;
  reset = false;
  @ViewChild('stepper') stepper: MatStepper;

  ngOnInit(): void {
    this.workoutPlan.Oefeningen = [
      new Oefening(
        'Push ups',
        'Do 15 Push ups',
        'An exercise done laying with face, palms and toes facing down, keeping legs and back straight, extending arms straight to push body up and back down again.',
        30),
      new Oefening(
        'Diamond Push ups',
        'Do 5 Diamond Push ups',
        'With a diamond push-up, your hands are closer together, with your fingers and thumbs forming a diamond or triangle shape, and this moves the focus from your chest muscles to your triceps.',
        30),
      new Oefening(
        'Dips',
        'Do 10 dips',
        'To perform a dip, support yourself on a dip bar or from a set of rings with their arms straight down and shoulders over their hands, then lowers their body until their arms are bent to a 90 degree angle at the elbows, and then lifts their body up, returning to the starting position.',
        30),
      new Oefening(
        'Laying down leg raises',
        'Do 8 Laying down leg raises',
        'Lie on your back on a mat with hands under your lower buttocks on either side to support your pelvis. Legs straight out in front of you, ankles together and feet slightly off the floor. Keep your knees straight and raise your legs by flexing the hips until they are completely flexed.',
        30),
      new Oefening(
        'Squats',
        'Do 8 squats',
        'Set your feet shoulder-width apart, toes slightly turned out. Pull in your lower abs, and keep your eyes forward. Slowly bend at the knees and drop your hips to lower your body. Keep your heels flat on the floor. At the bottom of the exercise pause for a moment and strongly push back up to the starting position, mirroring the descent.',
        30),
      new Oefening(
        'Rest',
        'It is time to take a quick rest.',
        'Just focus on your breathing and relax for a couple seconds.',
        30),
      new Oefening(
        'Push ups',
        'Do 15 Push ups',
        'An exercise done laying with face, palms and toes facing down, keeping legs and back straight, extending arms straight to push body up and back down again.',
        30),
      new Oefening(
        'Diamond Push ups',
        'Do 5 Diamond Push ups',
        'With a diamond push-up, your hands are closer together, with your fingers and thumbs forming a diamond or triangle shape, and this moves the focus from your chest muscles to your triceps.',
        30),
      new Oefening(
        'Dips',
        'Do 10 dips',
        'To perform a dip, support yourself on a dip bar or from a set of rings with their arms straight down and shoulders over their hands, then lowers their body until their arms are bent to a 90 degree angle at the elbows, and then lifts their body up, returning to the starting position.',
        30),
      new Oefening(
        'Laying down leg raises',
        'Do 8 Laying down leg raises',
        'Lie on your back on a mat with hands under your lower buttocks on either side to support your pelvis. Legs straight out in front of you, ankles together and feet slightly off the floor. Keep your knees straight and raise your legs by flexing the hips until they are completely flexed.',
        30),
      new Oefening(
        'Squats',
        'Do 8 squats',
        'Set your feet shoulder-width apart, toes slightly turned out. Pull in your lower abs, and keep your eyes forward. Slowly bend at the knees and drop your hips to lower your body. Keep your heels flat on the floor. At the bottom of the exercise pause for a moment and strongly push back up to the starting position, mirroring the descent.',
        30),
    ];

    this.workoutPlan.RustTussenOefeningen = 5;
    this.totalWorkoutTime = this.workoutPlan.Oefeningen
      .reduce((total, next) => {
        return {
          tijdsduur: total.tijdsduur + next.tijdsduur + this.workoutPlan.RustTussenOefeningen,
          naam: '',
          titel: '',
          beschrijving: ''
        };
    })
    .tijdsduur;

    this.workoutPlan.Naam = 'Calesthenics workout plan.';
    this.totalTimeLeft = this.totalWorkoutTime;
    this.progressValue = 100;
    this.currentExercise = 0;
    this.timeLeftCurrentExercise = this.workoutPlan.Oefeningen[0].tijdsduur;
    this.timeLeftForRest = this.workoutPlan.RustTussenOefeningen;
    this.isResting = false;
  }

  startWorkout(): void {
    clearInterval(this.timer);
    this.ngOnInit();
    this.stepper.reset();

    this.timer = setInterval(() => {
      if (this.totalTimeLeft <= 0) {
        clearInterval(this.timer);
        return;
      }

      if (this.timeLeftCurrentExercise <= 0) {
        this.currentExercise++;
        if (this.currentExercise !== this.workoutPlan.Oefeningen.length) {
          this.timeLeftCurrentExercise = this.workoutPlan.Oefeningen[this.currentExercise].tijdsduur;
        }
        this.timeLeftForRest = this.workoutPlan.RustTussenOefeningen;
        this.isResting = true;
      }

      if (this.timeLeftForRest <= 0 && this.isResting) {
        this.isResting = false;
        this.stepper.selected.completed = true;
        this.stepper.next();
      }

      this.totalTimeLeft--;
      this.progressValue =  (this.totalTimeLeft / this.totalWorkoutTime) * 100;

      if (this.totalTimeLeft === 0) {
        this.stepper.selected.completed = true;
        this.stepper.selected.state = 'done';
      }

      if (! this.isResting) {
        this.timeLeftCurrentExercise--;
      } else {
        this.timeLeftForRest--;
      }
    }, 1000);
  }
}
