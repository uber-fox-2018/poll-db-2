const Model = require('./Model.js');
const View = require('./View.js');

class Controller {
    constructor(input) {
        this.data = [];
        this.input = input;
        this.command();
    }

    command() {
        if (this.input[0] == 'addPolitician') {
            this.addingPolitician()
        } else if(this.input[0] == 'readPolitician') {
            this.readingPolitician()
        } else if(this.input[0] == 'readPoliticianR') {
            this.readingPoliticianPartyRGradeNineToEleven()
        } else if(this.input[0] == 'olympia') {
            this.readingPoliticianOlympia()
        } else if(this.input[0] == 'adam') {
            this.readingPoliticianAdam()
        } else if(this.input[0] == 'three') {
            this.readingPoliticianThre()
        } else if(this.input[0] == 'voterolympia') {
            this.readingPoliticianVoterOlympia()
        } else if(this.input[0] == 'addVoter') {
            this.addingVoter()
        } else if(this.input[0] == 'addVote') {
            this.addingVote()
        }
    }

    // adding vote from argv
    addingVote() {
        let voter_id = this.input[1];
        let politician_id = this.input[2];
        Model.addVote(voter_id, politician_id);
    }

    // adding voter from argv
    addingVoter() {
        let first_name = this.input[1];
        let last_name = this.input[2];
        let gender = this.input[3];
        let age = this.input[4];
        Model.addVoter(first_name, last_name, gender, age);
    }

    // adding politician from argv to sql
    addingPolitician() {
        let name = this.input[1];
        let party = this.input[2];
        let location = this.input[3];
        let grade_current = this.input[4];
        Model.addPolitician(name, party, location, grade_current)
    }

    // read politicians from argv 
    readingPolitician() {
        Model.readingPolitician((data) => {
            View.Display(data)
        });
    }

    // Party R and grade 9 > 11
    readingPoliticianPartyRGradeNineToEleven() {
        Model.readingPoliticianPartyRGradeNineToEleven((data) => {
            View.Display(data)
        });
    }

    // Olympia
    readingPoliticianOlympia() {
        Model.readingPoliticianOlympia( (data) => {
            View.Display(data);
        })
    }

    // Adam
    readingPoliticianAdam() {
        Model.readingPoliticianAdam( (data) => {
            View.Display(data);
        })
    }

    // 3 besar
    readingPoliticianThre() {
        Model.readingPoliticianThre( (data) => {
            View.Display(data);
        })
    }

    //
    readingPoliticianVoterOlympia() {
        Model.readingPoliticianVoteOlympia( (data) => {
            View.Display(data);
        })
    }


}

module.exports = Controller