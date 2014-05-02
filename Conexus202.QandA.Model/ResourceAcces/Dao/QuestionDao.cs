namespace IT_MATICA.QandA.Model.ResourceAcces.Dao
{
    using System.Collections.Generic;
    using System.Data;
    using Business.Entities;
    using Helper;
    using Util;


    internal class QuestionDao
    {
        internal IList<Question> GetQuestions()
        {
            SQLiteDatabase db = new SQLiteDatabase();

            DataTable questionsTable = db.GetDataTable(Constants.SqlQuestions);
            IList<Question> questions = new List<Question>();
            
            if (questionsTable != null && questionsTable.Rows.Count > 0)
            {
                Question question;
                foreach (DataRow row in questionsTable.Rows)
                {
                    question = new Question();
                    question.Answer =row["answer"].ToString() == "1";
                    question.Description = row["question"].ToString();
                    question.Number = int.Parse(row["number"].ToString());
                    question.QuestionId = int.Parse(row["question_id"].ToString());

                    questions.Add(question);
                }
            }

            return questions;
        }
    }
}
