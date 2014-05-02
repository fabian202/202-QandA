namespace IT_MATICA.QandA.Model.Service
{
    using System.Collections.Generic;
    using Business.BussinesLogic;
    using Business.Entities;

    public class QandAapi : IQandAapi
    {
        public string Test()
        {
            return "Prueba";
        }

        public IList<Question> GetQuestions()
        {
            //IList<Question> questions = new List<Question>()
            //{
            //    new Question() {Answer = true,Description = "nada",Number = 1,QuestionId = 1}
            //};
            
            //return questions;
            return new QuestionBl().GetQuestions();
        }

        public int SaveParticipant(Participant participant)
        {
            return new ParticipantBl().SaveParticipant(participant);
        }

        public bool SaveAnswers(IList<Answer> answers)
        {
            return new AnswerBl().SaveAnswers(answers);
        }

        public IList<Participant> GetReport()
        {
            return new ParticipantBl().GetReport();
        }
    }
}
