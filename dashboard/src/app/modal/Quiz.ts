export class Quiz{
  id : string;
  questions : string;
  answers : string;
  level: number = 0;
  active : boolean = true;
  created_at : string = new Date().toISOString();
  updated_at : string = new Date().toISOString();
}
