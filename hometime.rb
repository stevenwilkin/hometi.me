class HomeTime < Sinatra::Base

	set :static, true
	set :public, File.join(File.dirname(__FILE__), 'public')
	set :logging, true

	get '/' do
		haml :index
	end

	get '/css/:stylesheet.css' do
		content_type 'text/css', :charset => 'utf-8'
		sass params[:stylesheet].to_sym
	end

end
