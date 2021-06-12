using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GetNewGamesAPI.Models
{
    public class GameRepositorio
    {


        private MySqlConnection Connect()
        {
            string server = "server=127.0.0.1;";
            string port = "port=3306;";
            string database = "database=gngames;";
            string usuario = "uid=root;";
            string password = "pwd=;";

            string connString = server + port + database + usuario + password;
            MySqlConnection con = new MySqlConnection(connString);
            return con;
        }
        internal List<Game> Retrive()
        {
            List<Game> mercados = new List<Game>();
            MySqlConnection con = Connect();
            MySqlCommand comand = con.CreateCommand();
            comand.CommandText = "SELECT * FROM `games`";
            Game ap = null;
            try
            {
                con.Open();
                MySqlDataReader res = comand.ExecuteReader();

                if (res.Read())
                {
                    ap = new Game(res.GetInt32(0), res.GetString(1), res.GetString(2), res.GetString(4), res.GetDateTime(3), res.GetDecimal(5), res.GetDecimal(6));
                    mercados.Add(ap);
                }

            }
            catch (Exception e)
            {


            }

            con.Close();
            return mercados;
        }






        internal List<Game> Retrive2(int id)
        {
            List<Game> mercados = new List<Game>();
            MySqlConnection con = Connect();
            MySqlCommand comand = con.CreateCommand();
            comand.CommandText = "SELECT* FROM `games` WHERE `USUARIO_EMAIL` = '" + id + "'";
            Game ap = null;
            try
            {
                con.Open();
                MySqlDataReader res = comand.ExecuteReader();

                if (res.Read())
                {
                    ap = new Game(res.GetInt32(0), res.GetString(1), res.GetString(2), res.GetString(3), res.GetDateTime(4), res.GetDecimal(5), res.GetDecimal(6));
                    mercados.Add(ap);
                }

            }
            catch (Exception e)
            {
            }

            con.Close();
            return mercados;
        }


        /*

        internal void Save(Game a)
        {
            //Game a = new Game(23, "2020-11-05 12:22:54", 1, 23, "123", "123");
            MySqlConnection con = Connect();
            MySqlCommand command = con.CreateCommand();
            command.CommandText = "INSERT INTO `Game` (`idGame`, `name`, `pasword`, `admin`) VALUES ('" + a.idGame + "' , '" + a.name + "' ,'" + a.pasword + "' ,'" + a.admin + "' );";

            try
            {
                con.Open();
                command.ExecuteNonQuery();
                con.Close();
            }
            catch (Exception e)
            {
                Debug.WriteLine("Error Insert Game");
            }
        }

    */
    }
}