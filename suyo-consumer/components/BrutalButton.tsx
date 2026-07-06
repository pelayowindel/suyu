import { View, Pressable, PressableProps } from "react-native";

interface BrutalButtonProps extends PressableProps {
  className?: string;
  shadowClassName?: string;
  children: React.ReactNode;
}

export function BrutalButton({ className = "", shadowClassName = "", children, ...props }: BrutalButtonProps) {
  return (
    <View className="pb-[8px]">
      <View className={`absolute left-[8px] top-[8px] bg-black ${shadowClassName}`} />
      <Pressable className={`border-2 border-black ${className}`} {...props}>
        {children}
      </Pressable>
    </View>
  );
}
