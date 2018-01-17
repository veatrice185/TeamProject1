package servlet;

import java.io.*;
import java.util.HashMap;
import java.util.Random;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.annotation.WebInitParam;
import javax.servlet.annotation.WebServlet;

import model.DbManager;
import beans.RecommendMusic;

import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;

/**
 * Servlet implementation class UserServlet
 */
@WebServlet(
		urlPatterns = { "/Recommend" }, 
		initParams = { 
				@WebInitParam(name = "jdbcDriver", value = "com.mysql.jdbc.Driver"), 
				@WebInitParam(name = "dbUrl", value = "jdbc:mysql://localhost:3306/musicclipper?useUnicode=true&amp;characterEncoding=UTF-8"), 
				@WebInitParam(name = "dbPass", value = "webclass"), 
				@WebInitParam(name = "dbUser", value = "root")
		})
public class Recommend extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private DbManager DbManager;
	private ArrayList<RecommendMusic> recommendMusic;
	
	/**
	 * @see Servlet#init(ServletConfig)
	 */
	public void init(ServletConfig config) throws ServletException {
		// TODO Auto-generated method stub
		super.init();
		DbManager = new DbManager();
		DbManager.setDbUrl(config.getInitParameter("dbUrl"));
		DbManager.setDbUser(config.getInitParameter("dbUser"));
		DbManager.setDbPass(config.getInitParameter("dbPass"));
		try {
			Class.forName(config.getInitParameter("jdbcDriver"));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		processRequest(request, response);
	}
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		processRequest(request, response);
	}
	
	/**
	 * Process the request here
	 */
	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		response.setContentType("application/json"); 
		recommendMusic = DbManager.getRecommendMusic();

		JSONObject list = new JSONObject();
		HashMap<String,Object> tmp = new HashMap<String,Object>();
		for(int i = 0; i < recommendMusic.size();i++){
			tmp = new HashMap<String,Object>();
			tmp.put("title", recommendMusic.get(i).getTitle());
			tmp.put("singer", recommendMusic.get(i).getSinger());
			tmp.put("url", recommendMusic.get(i).getUrl());
			tmp.put("star", recommendMusic.get(i).getStar());
			tmp.put("sourceType", recommendMusic.get(i).getSourceType());
			tmp.put("musicId", recommendMusic.get(i).getMusicId());
			tmp.put("image", recommendMusic.get(i).getImage());
			try{
				list.put(String.valueOf(i), tmp);
			}catch(Exception ex){
				
			}
		}
		out.print(list);
	}
}
