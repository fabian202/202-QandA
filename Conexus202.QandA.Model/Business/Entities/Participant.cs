namespace IT_MATICA.QandA.Model.Business.Entities
{
    public class Participant
    {
        public string Name { get; set; }
        public string Identification { get; set; }
        public string Email { get; set; }
        public int? ParticipantId { get; set; }

        public string Corrects { get; set; }
    }
}
