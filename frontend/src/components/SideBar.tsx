import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export function SideBar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <Button
              variant="ghost"
              className="mx-auto w-full h-24 rounded-md px-8 block"
              size={null}
            >
              <div className="flex justify-around">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  className="w-8"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fillRule="evenodd" clipRule="evenodd" d="M8.51669 4.79613C5.84343 6.09112 4 8.83028 4 12C4 12.1969 4.00711 12.3921 4.0211 12.5855L10.1629 10.9398L8.51669 4.79613ZM11.4148 4.02107L13.1901 10.6463L13.2017 10.6897C13.2517 10.8754 13.3222 11.1373 13.3532 11.3775C13.3922 11.6802 13.4014 12.159 13.1197 12.6469C12.838 13.1348 12.4188 13.3662 12.1371 13.4838C11.9136 13.5771 11.6515 13.647 11.4657 13.6965L11.4223 13.7081L4.79626 15.4836C6.0913 18.1567 8.83039 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C11.8032 4 11.6081 4.00711 11.4148 4.02107Z"/>
                  <path d="M9.92945 4.27259C9.67849 3.33602 9.55302 2.86773 9.12083 2.67286C8.68865 2.47799 8.30723 2.66782 7.54439 3.04748C6.97028 3.33321 6.42361 3.67419 5.91239 4.06647C4.87054 4.8659 3.99636 5.86272 3.33975 7C2.68314 8.13728 2.25696 9.39275 2.08555 10.6947C2.00144 11.3336 1.97948 11.9775 2.01909 12.6176C2.07171 13.4681 2.09803 13.8933 2.48288 14.1701C2.86773 14.447 3.33602 14.3215 4.27259 14.0706L10.0681 12.5176C10.9788 12.2736 11.4342 12.1516 11.6413 11.7929C11.8484 11.4342 11.7264 10.9788 11.4824 10.0681L9.92945 4.27259Z"/>
                </svg>
              </div>
              Dashboard
            </Button>
           
            <Button
              variant="ghost"
              className="w-full h-24 px-8 block mx-auto"
              size={null}
            >
              <Link to="/clients">
                <div className="flex justify-around">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M19.6515 19.4054C20.2043 19.2902 20.5336 18.7117 20.2589 18.2183C19.6533 17.1307 18.6993 16.1749 17.4788 15.4465C15.907 14.5085 13.9812 14 12 14C10.0188 14 8.09292 14.5085 6.52112 15.4465C5.30069 16.1749 4.34666 17.1307 3.74108 18.2183C3.46638 18.7117 3.79562 19.2902 4.34843 19.4054C9.39524 20.4572 14.6047 20.4572 19.6515 19.4054Z"/>
                    <circle cx="12" cy="8" r="5"/>
                  </svg>
                </div>
                My Profile
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full h-24 px-8 block mx-auto"
              size={null}
              >
              <Link to="/sales">
                <div className="flex justify-around">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    className="w-8"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.58579 4.58579C5 5.17157 5 6.11438 5 8V17C5 18.8856 5 19.8284 5.58579 20.4142C6.17157 21 7.11438 21 9 21H15C16.8856 21 17.8284 21 18.4142 20.4142C19 19.8284 19 18.8856 19 17V8C19 6.11438 19 5.17157 18.4142 4.58579C17.8284 4 16.8856 4 15 4H9C7.11438 4 6.17157 4 5.58579 4.58579ZM9 8C8.44772 8 8 8.44772 8 9C8 9.55228 8.44772 10 9 10H15C15.5523 10 16 9.55228 16 9C16 8.44772 15.5523 8 15 8H9ZM9 12C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14H15C15.5523 14 16 13.5523 16 13C16 12.4477 15.5523 12 15 12H9ZM9 16C8.44772 16 8 16.4477 8 17C8 17.5523 8.44772 18 9 18H13C13.5523 18 14 17.5523 14 17C14 16.4477 13.5523 16 13 16H9Z"/>
                  </svg>
                </div>
                My Careers
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
