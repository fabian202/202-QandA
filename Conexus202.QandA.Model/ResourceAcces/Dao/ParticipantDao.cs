namespace IT_MATICA.QandA.Model.ResourceAcces.Dao
{
    using System.Collections.Generic;
    using System.Data;
    using Business.Entities;
    using Helper;
    using Util;

    internal class ParticipantDao
    {
        internal int SaveParticipant(Participant participant)
        {
            SQLiteDatabase db = new SQLiteDatabase();
            var participantDictionary = new Dictionary<string, string>
            {
                {"identification",participant.Identification},
                {"email",participant.Email},
                {"name",participant.Name}                
            };
            if (db.Insert("participant", participantDictionary))
            {
                return GetParticipantId(participant.Identification);
            }

            return 0;
        }

        private int GetParticipantId(string identification)
        {
            SQLiteDatabase db = new SQLiteDatabase();

            DataTable participanTable = db.GetDataTable(string.Format(Constants.SqlParticipantId,identification));

            if (participanTable != null && participanTable.Rows.Count > 0)
            {
                return int.Parse(participanTable.Rows[0]["participant_id"].ToString());
            }

            return 0;
        }

        internal IList<Participant> GetReport()
        {
            SQLiteDatabase db = new SQLiteDatabase();

            DataTable reportTable = db.GetDataTable(Constants.SqlReport);

            IList<Participant> report = new List<Participant>();
            if (reportTable != null && reportTable.Rows.Count > 0)
            {
                Participant participant;
                foreach (DataRow row in reportTable.Rows)
                {
                    participant = new Participant();
                    participant.Email = row["email"].ToString();
                    participant.Identification = row["identification"].ToString();
                    participant.Name = row["name"].ToString();
                    participant.Corrects = row["corrects"].ToString();

                    report.Add(participant);
                }
            }

            return report;
        }
    }
}
