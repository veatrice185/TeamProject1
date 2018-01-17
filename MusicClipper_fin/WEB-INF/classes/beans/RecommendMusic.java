package beans;

public class RecommendMusic {
	private String title;
	private String singer;
	private String url;
	private int star;
	private int sourceType;
	private int musicId;
	private String image;
	
	
	public RecommendMusic() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getSinger() {
		return singer;
	}
	public void setSinger(String singer) {
		this.singer = singer;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public int getStar() {
		return star;
	}
	public void setStar(int star) {
		this.star = star;
	}
	public int getSourceType() {
		return sourceType;
	}
	public void setSourceType(int sourceType) {
		this.sourceType = sourceType;
	}
	public int getMusicId() {
		return musicId;
	}
	public void setMusicId(int musicId) {
		this.musicId = musicId;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	
	@Override
	public String toString() {
		return "title=" + title + ", singer=" + singer
				+ ", url=" + url + ", star=" + star + ", sourceType="
				+ sourceType + ", musicId=" + musicId + ", image=" + image;
	} 
	
	
	
}
