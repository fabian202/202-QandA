namespace IT_MATICA.QandA.Model.Business.Entities
{
    public class Answer
    {
        public int AnswerId { get; set; }
        public int QuestionId  { get; set; }
        public int ParticipantId { get; set; }
        public bool IsCorrect { get; set; }
    }
}
