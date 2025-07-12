import { useState, useEffect } from "react";
import { useOpenAIChat } from "./hooks/useOpenAIChat";
import MessageContent from "./components/MessageContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Send, Bot, User, Trash2 } from "lucide-react";

export default function ChatBot() {
  const [connectionStatus, setConnectionStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedModel, setSelectedModel] = useState("gpt-4o-mini");

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
    error,
  } = useOpenAIChat(selectedModel);

  // Handle errors from the hook
  useEffect(() => {
    if (error) {
      setErrorMessage(error);
      setConnectionStatus("error");
    } else if (messages.length > 0 && !isLoading) {
      setConnectionStatus("connected");
      setErrorMessage("");
    }
  }, [error, messages.length, isLoading]);

  const clearChat = () => {
    setMessages([]);
  };

  const handleModelChange = (newModel) => {
    setSelectedModel(newModel);
    // Clear chat when model changes
    setMessages([]);
    setConnectionStatus("idle");
    setErrorMessage("");

    // Show brief feedback about model change
    setConnectionStatus("connecting");
    setTimeout(() => {
      setConnectionStatus("idle");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto h-screen flex flex-col">
        {/* Header */}
        <Card className="mb-4">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">
                    Human-AI Co-Creation
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    Creative Collaboration • {selectedModel.toUpperCase()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Select
                  value={selectedModel}
                  onValueChange={handleModelChange}
                  disabled={isLoading}
                >
                  <SelectTrigger className="w-36 h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-4.1">
                      <div className="flex flex-col">
                        <span>GPT-4.1</span>
                        <span className="text-xs text-gray-500">
                          Latest flagship model
                        </span>
                      </div>
                    </SelectItem>
                    <SelectItem value="gpt-4.1-mini">
                      <div className="flex flex-col">
                        <span>GPT-4.1 Mini</span>
                        <span className="text-xs text-gray-500">
                          Optimized for speed
                        </span>
                      </div>
                    </SelectItem>
                    <SelectItem value="gpt-4.1-nano">
                      <div className="flex flex-col">
                        <span>GPT-4.1 Nano</span>
                        <span className="text-xs text-gray-500">
                          Ultra-fast responses
                        </span>
                      </div>
                    </SelectItem>
                    <SelectItem value="gpt-4o">
                      <div className="flex flex-col">
                        <span>GPT-4o</span>
                        <span className="text-xs text-gray-500">
                          Multimodal capabilities
                        </span>
                      </div>
                    </SelectItem>
                    <SelectItem value="gpt-4o-mini">
                      <div className="flex flex-col">
                        <span>GPT-4o Mini</span>
                        <span className="text-xs text-gray-500">
                          Balanced performance
                        </span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Badge
                  variant={
                    connectionStatus === "connected"
                      ? "default"
                      : connectionStatus === "error"
                      ? "destructive"
                      : "secondary"
                  }
                  className="text-xs flex items-center space-x-1"
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      connectionStatus === "connected"
                        ? "bg-green-500"
                        : connectionStatus === "error"
                        ? "bg-red-500"
                        : connectionStatus === "connecting"
                        ? "bg-yellow-500 animate-pulse"
                        : "bg-gray-500"
                    }`}
                  ></div>
                  <span>
                    {connectionStatus === "connected"
                      ? "Terhubung"
                      : connectionStatus === "error"
                      ? "Error"
                      : connectionStatus === "connecting"
                      ? "Menghubungkan..."
                      : "SumoPod AI"}
                  </span>
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearChat}
                  disabled={isLoading}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Clear
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {errorMessage && (
          <Card className="mb-4 border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 text-red-700">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <span className="text-sm font-medium">
                  Error: {errorMessage}
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Chat Messages */}
        <Card className="flex-1 flex flex-col">
          <CardContent className="flex-1 p-0">
            <ScrollArea className="h-full p-4">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Bot className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Mari berkolaborasi bersama!
                    </h3>
                    <p className="text-gray-600">
                      Saya siap menjadi partner kreatif Anda dengan{" "}
                      {selectedModel.toUpperCase()}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Berbagi ide, eksplorasi konsep, atau ciptakan sesuatu yang
                      luar biasa bersama-sama
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      💡 Tip: Ceritakan proyek atau ide yang ingin Anda
                      kembangkan
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      ✨ Response akan terformat dengan baik menggunakan
                      Markdown
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start space-x-3 ${
                        message.role === "user"
                          ? "flex-row-reverse space-x-reverse"
                          : ""
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.role === "user"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {message.role === "user" ? (
                          <User className="w-4 h-4" />
                        ) : (
                          <Bot className="w-4 h-4" />
                        )}
                      </div>
                      <div
                        className={`flex-1 p-3 rounded-lg ${
                          message.role === "user"
                            ? "bg-blue-500 text-white ml-12"
                            : "bg-white border mr-12"
                        }`}
                      >
                        <MessageContent
                          content={message.content}
                          isUser={message.role === "user"}
                        />
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="bg-white border p-4 rounded-lg mr-12">
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-500 ml-2">
                            Partner AI sedang memikirkan respons kreatif...
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </ScrollArea>
          </CardContent>

          <Separator />

          {/* Input Form */}
          <CardFooter className="p-4">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col w-full space-y-2"
            >
              <div className="flex w-full space-x-2">
                <div className="flex-1 relative">
                  <Input
                    value={input}
                    onChange={handleInputChange}
                    placeholder={
                      isLoading
                        ? "Menunggu respons..."
                        : "Bagikan ide atau proyek yang ingin kita kembangkan bersama..."
                    }
                    disabled={isLoading || connectionStatus === "error"}
                    className="flex-1 pr-12"
                    autoFocus
                    maxLength={1000}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                    {input.length}/1000
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={
                    isLoading || !input.trim() || connectionStatus === "error"
                  }
                  className="relative"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
              {connectionStatus === "error" && (
                <p className="text-xs text-red-500 text-center">
                  Tidak dapat mengirim pesan. Periksa koneksi atau API key Anda.
                </p>
              )}
            </form>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
