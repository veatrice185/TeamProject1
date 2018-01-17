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

import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;

import model.DbManager;
import beans.user;
import beans.playlist;

/**
 * Servlet implementation class UserServlet
 */
@WebServlet(
		urlPatterns = { "/login" }, 
		initParams = { 
				@WebInitParam(name = "jdbcDriver", value = "com.mysql.jdbc.Driver"), 
				@WebInitParam(name = "dbUrl", value = "jdbc:mysql://localhost:3306/musicclipper?useUnicode=true&amp;characterEncoding=UTF-8"), 
				@WebInitParam(name = "dbPass", value = "webclass"), 
				@WebInitParam(name = "dbUser", value = "root")
		})
public class login extends HttpServlet {
	private static final long serialVersionUID = 1L;

	private DbManager dbManager;
	private ArrayList<playlist> playlist;
	private user user;
	
	public void init(ServletConfig config) throws ServletException {
		// TODO Auto-generated method stub
		super.init();
		dbManager = new DbManager();
		dbManager.setDbUrl(config.getInitParameter("dbUrl"));
		dbManager.setDbUser(config.getInitParameter("dbUser"));
		dbManager.setDbPass(config.getInitParameter("dbPass"));
		try {
			Class.forName(config.getInitParameter("jdbcDriver"));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		processRequest(request, response);
	}
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		processRequest(request, response);
	}
	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		response.setContentType("application/json");
		
		String email = request.getParameter("email");
		String password = request.getParameter("password");

		user = dbManager.getUser(email);
		
		if(user.getEmail() == null){
			out.println("<script>");
			out.println("alert('Login Fail.')");
			out.println("location.replace('main.jsp')");
			out.println("</script>");
		}
		else {
			int userID = user.getUserId();
			playlist = dbManager.getUserPlayList(userID);
			JSONObject list = new JSONObject();
			HashMap<String,Object> tmp = new HashMap<String,Object>();
			for(int i = 0; i < playlist.size();i++){
				tmp = new HashMap<String,Object>();
				tmp.put("title", playlist.get(i).getTitle());
				tmp.put("singer", playlist.get(i).getSinger());
				tmp.put("url", playlist.get(i).getUrl());
				tmp.put("sourceType", playlist.get(i).getSourceType());
				tmp.put("image", playlist.get(i).getImage());
				try{
					list.put(String.valueOf(i), tmp);
				}catch(Exception ex){
					
				}
			}
			tmp = new HashMap<String,Object>();
			tmp.put("email", user.getEmail());
			tmp.put("userId", user.getUserId());
			tmp.put("lastLogin", user.getLastLogin());
			try{
				list.put(String.valueOf(playlist.size()), tmp);
			}catch(Exception ex){
			}
			out.print(list);
		}
	}
}
