# ===========================================================================
# Project:   Thecodeboutique
# Copyright: ©2011 My Company, Inc.
# ===========================================================================

# Add initial buildfile information here
# config :all, :required => [:sproutcore, :ki, "sproutcore/ace"],  :theme => "sproutcore/ace"
config :all, :required => [:sproutcore, :ki]

# CONFIGURE THEMES
 config :thecodeboutique, :theme => 'endeavourlight'
 config :endeavourlight,  :theme_name => 'endeavourlight'

proxy "/visitors", :to => "localhost:3000"