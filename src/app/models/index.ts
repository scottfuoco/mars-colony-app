export class Comment {
    constructor(
        public id: number,
        public colonist_id: number,
        public comment: string,
        public date: string,
    ){}
}

export class EncounterComments{
     constructor(
        public enocounter_id: number,
        public comments: Comment[]
    ){}
}

export class NewEncounter {
    constructor(
        public date: string,
        public colonist_id: string,
        public atype: string,
        public action: string,
    ){}
}

export interface Encounter {
    id: number;
    date: string;
    colonist_id: number;
    atype: string;
    action: string;
}

export class EncounterColonist {
    constructor(
        public id: number,
        public date: string,
        public colonist_id: number,
        public atype: string,
        public action: string,
        public colonist: Colonist,
    ){}
}

export interface Job {
    id: number;
    name: string;
    description: string;
}

export class NewColonist {
    constructor(
        public name: string,
        public age: number,
        public job_id: string,
    ){}
}

export class Colonist {
    constructor(
        public id: number,
        public name: string,
        public age: number,
        public job: Job,
    ){}
}

export interface Alien {
    id: number;
    type: string;
    submitted_by: string;
    description: string;
}