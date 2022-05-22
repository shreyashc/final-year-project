import { useMantineTheme } from "@mantine/core";
import { useNavigate } from "react-router-dom";

interface MantineLogoProps extends React.ComponentPropsWithoutRef<"svg"> {
  variant?: "white" | "default";
  width?: number;
}

export function Logo({ variant = "default", width = 150 }: MantineLogoProps) {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  return (
    <img
      style={{ cursor: "pointer" }}
      onClick={() => navigate("/")}
      width={width}
      className="img-fluid"
      src={`${process.env.PUBLIC_URL}/StartEzy.png`}
      alt="logo"
    />
  );
}

export function MantineLogoSmall({
  width = 30,
  variant = "default",
  ...others
}: MantineLogoProps) {
  const theme = useMantineTheme();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 163 163"
      width={width}
      height={width}
      {...others}
    >
      <path
        fill={
          variant === "white" ? "#FFF" : theme.colors[theme.primaryColor][6]
        }
        d="M162.162 81.5c0-45.011-36.301-81.5-81.08-81.5C36.301 0 0 36.489 0 81.5 0 126.51 36.301 163 81.081 163s81.081-36.49 81.081-81.5z"
      />
      <path
        fill={
          variant === "default" ? "#FFF" : theme.colors[theme.primaryColor][6]
        }
        d="M65.983 43.049a6.234 6.234 0 00-.336 6.884 6.14 6.14 0 001.618 1.786c9.444 7.036 14.866 17.794 14.866 29.52 0 11.726-5.422 22.484-14.866 29.52a6.145 6.145 0 00-1.616 1.786 6.21 6.21 0 00-.694 4.693 6.21 6.21 0 001.028 2.186 6.151 6.151 0 006.457 2.319 6.154 6.154 0 002.177-1.035 50.083 50.083 0 007.947-7.39h17.493c3.406 0 6.174-2.772 6.174-6.194s-2.762-6.194-6.174-6.194h-9.655a49.165 49.165 0 004.071-19.69 49.167 49.167 0 00-4.07-19.692h9.66c3.406 0 6.173-2.771 6.173-6.194 0-3.422-2.762-6.193-6.173-6.193H82.574a50.112 50.112 0 00-7.952-7.397 6.15 6.15 0 00-4.578-1.153 6.189 6.189 0 00-4.055 2.438h-.006z"
      />
      <path
        fill={
          variant === "default" ? "#FFF" : theme.colors[theme.primaryColor][6]
        }
        fillRule="evenodd"
        d="M56.236 79.391a9.342 9.342 0 01.632-3.608 9.262 9.262 0 011.967-3.077 9.143 9.143 0 012.994-2.063 9.06 9.06 0 017.103 0 9.145 9.145 0 012.995 2.063 9.262 9.262 0 011.967 3.077 9.339 9.339 0 01-2.125 10.003 9.094 9.094 0 01-6.388 2.63 9.094 9.094 0 01-6.39-2.63 9.3 9.3 0 01-2.755-6.395z"
        clipRule="evenodd"
      />
    </svg>
  );
}
