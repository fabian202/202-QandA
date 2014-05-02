namespace IT_MATICA.QandA.Model.Util
{
    public  class Constants
    {
        public const string DataBaseName = "qanda_db.sqlite";

        public const string SqlQuestions = "SELECT question_id,question,answer,number FROM questions ORDER BY number LIMIT 5";

        public const string SqlParticipantId = "SELECT participant_id FROM participant  where identification = '{0}' ORDER BY participant_id DESC LIMIT 1";

        public const string SqlSaveAnswers = "INSERT INTO answers (question_id, participant_id,is_correct) VALUES ";

        public const string SqlReport = "SELECT p.participant_id, identification, name, email, (SELECT COUNT(*) FROM answers WHERE participant_id = p.[participant_id] AND is_correct = 1) as corrects FROM participant p ORDER BY corrects DESC, name";
    }
    
}
