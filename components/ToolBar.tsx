import React, { useState } from "react";
import { PlusIcon } from "@radix-ui/react-icons";
import { FaRegUserCircle } from "react-icons/fa";

interface ExpandableToolbarProps {
  user: {
    user_id: string;
    username: string;
  } | null;
  onLogin: (loginInfo: { username: string; password: string }) => void;
  onSignUp: (signUpInfo: { username: string; password: string }) => void;
  onLogout: () => void;
  onCaloriesEntry: (entry: { calories: number; time: Date }) => void;
}

const ExpandableToolbar: React.FC<ExpandableToolbarProps> = ({
  user,
  onLogin,
  onSignUp,
  onLogout,
  onCaloriesEntry,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isEntryOpen, setIsEntryOpen] = useState(false);
  const [loginInfo, setLoginInfo] = useState({ username: "", password: "" });
  const [calories, setCalories] = useState("");

  const handleLoginSubmit = () => {
    onLogin(loginInfo);
    setIsLoginOpen(false);
  };

  const handleSignUpSubmit = () => {
    onSignUp(loginInfo);
    setIsSignUpOpen(false);
  };

  const handleCaloriesSubmit = () => {
    onCaloriesEntry({ calories: parseInt(calories), time: new Date() });
    setIsEntryOpen(false);
  };

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
      <div
        className={`grid grid-cols-3 bg-white rounded-lg transition-all duration-600 gap-6 items-center px-4 max-w-lg ${
          isExpanded ? "opacity-100 h-16 scale-x-100" : "opacity-0 scale-x-0"
        }`}
      >
        {user ? (
          <div
            className="flex flex-col items-center justify-center cursor-pointer"
            onClick={onLogout}
          >
            <FaRegUserCircle className="text-green-500 w-6 h-6" />
            <span className="text-sm text-gray-700">Profile</span>
          </div>
        ) : (
          <>
            <div
              className="flex flex-col items-center justify-center cursor-pointer"
              onClick={() => setIsLoginOpen(true)}
            >
              <FaRegUserCircle className="text-indigo-500 w-6 h-6" />
              <span className="text-sm text-gray-700">Login</span>
            </div>
            <div
              className="flex flex-col items-center justify-center cursor-pointer"
              onClick={() => setIsSignUpOpen(true)}
            >
              <FaRegUserCircle className="text-blue-500 w-6 h-6" />
              <span className="text-sm text-gray-700">SignUp</span>
            </div>
          </>
        )}

        <div
          className="flex flex-col items-center justify-center cursor-pointer"
          onClick={() => setIsEntryOpen(true)}
        >
          <FaRegUserCircle className="text-red-500 w-6 h-6" />
          <span className="text-sm text-gray-700">Entry</span>
        </div>
      </div>

      <div className="z-20">
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="flex items-center justify-center w-14 h-14 bg-indigo-500 text-white rounded-full shadow-lg transition-transform duration-300"
        >
          <PlusIcon
            className={`w-8 h-8 transform transition-transform duration-300 ${
              isExpanded ? "rotate-45" : "rotate-0"
            }`}
          />
        </button>
      </div>

      {/* 登录弹框 */}
      {isLoginOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-30">
          <div className="bg-white rounded-lg p-6 w-80">
            <h2 className="text-lg font-semibold mb-4">Login</h2>
            <input
              type="text"
              placeholder="username"
              value={loginInfo.username}
              onChange={(e) =>
                setLoginInfo({ ...loginInfo, username: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg p-2 mb-4"
            />
            <input
              type="password"
              placeholder="Password"
              value={loginInfo.password}
              onChange={(e) =>
                setLoginInfo({ ...loginInfo, password: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg p-2 mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setIsLoginOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleLoginSubmit}
                className="px-4 py-2 bg-indigo-500 text-white rounded-lg"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 注册弹框 */}
      {isSignUpOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-30">
          <div className="bg-white rounded-lg p-6 w-80">
            <h2 className="text-lg font-semibold mb-4">Sign Up</h2>
            <input
              type="text"
              placeholder="username"
              value={loginInfo.username}
              onChange={(e) =>
                setLoginInfo({ ...loginInfo, username: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg p-2 mb-4"
            />
            <input
              type="password"
              placeholder="Password"
              value={loginInfo.password}
              onChange={(e) =>
                setLoginInfo({ ...loginInfo, password: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg p-2 mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setIsSignUpOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSignUpSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                SignUp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 卡路里输入弹框 */}
      {isEntryOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-30">
          <div className="bg-white rounded-lg p-6 w-80">
            <h2 className="text-lg font-semibold mb-4">Enter Calories</h2>
            <input
              type="number"
              placeholder="Calories"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setIsEntryOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleCaloriesSubmit}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpandableToolbar;
