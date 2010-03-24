require 'rubygems'
require 'sinatra'
require 'haml'
require 'sass'

# middleware
require 'lib/no_www'
use NoWWW

# main app
require 'hometime'
run HomeTime
