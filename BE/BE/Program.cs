using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BE
{
    class Program
    {
        public static string Replace(string BaseText, string Key, string Value)
        {
            int index = BaseText.IndexOf(Key);

            while (index > 0)
            {
                if (index > 0)
                {
                    BaseText = BaseText.Remove(index, Key.Length);
                    BaseText = BaseText.Insert(index, Value);
                }
                index = BaseText.IndexOf(Key);
            }
            

            return BaseText;
        }
        public static string ChangeStrings(string PrmText, Dictionary<string, string> DicReplacements)
        {
            foreach (KeyValuePair<string, string> row in DicReplacements)
            {
                PrmText = Replace(PrmText, row.Key, row.Value);
            }
            return PrmText;
        }
        static void Main(string[] args)
        {
            Dictionary<string, string> dictionary = new Dictionary<string, string>();
            dictionary.Add("[UserName]", "Ruth");
            dictionary.Add("[EmailAddr]", "r@gmail.com");
            dictionary.Add("[TeamName]", "Taskeem Team");

            string BaseText = "Hi [UserName],\nWe received your request; it will be done by the end of the week.\nThe response will be sent to your email [EmailAddr].\nThanks [UserName],\nTeamName";
            Console.WriteLine(ChangeStrings(BaseText, dictionary));
            Console.ReadLine();

        }
    }
}
