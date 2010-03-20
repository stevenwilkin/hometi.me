class HomeTime < Sinatra::Base

	set :public, File.join(File.dirname(__FILE__), 'public')

	get '/' do
		haml :index
	end

	get '/css/:stylesheet.css' do
		content_type 'text/css', :charset => 'utf-8'
		sass params[:stylesheet].to_sym
	end

end
