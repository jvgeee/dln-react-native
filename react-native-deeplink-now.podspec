require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-deeplink-now"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => "13.0" }
  s.source       = { :git => "https://github.com/jvgeee/react-native-deeplink-now.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,mm,swift}"

  s.dependency "React-Core"
  s.dependency "DeepLinkNow", "~> 0.1.2"

  s.prepare_command = <<-CMD
    echo 'source "https://github.com/jvgeee/dln-ios.git"' >> ~/.cocoapods/config
  CMD
end 