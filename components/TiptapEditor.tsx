"use client"

import type React from "react"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Button } from "@/components/ui/button"
import {
    Bold,
    Italic,
    Strikethrough,
    Code,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Quote,
    Undo,
    Redo,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface TiptapEditorProps {
    content: string
    onChange: (content: string) => void
    placeholder?: string
    className?: string
}

export function TiptapEditor({ content, onChange, placeholder = "Start writing...", className }: TiptapEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
                orderedList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
            }),
        ],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
        editorProps: {
            attributes: {
                class: "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4",
            },
        },
    })

    if (!editor) {
        return null
    }

    const MenuButton = ({
        onClick,
        isActive = false,
        children,
        disabled = false,
    }: {
        onClick: () => void
        isActive?: boolean
        children: React.ReactNode
        disabled?: boolean
    }) => (
        <Button
            type="button"
            variant={isActive ? "default" : "ghost"}
            size="sm"
            onClick={onClick}
            disabled={disabled}
            className={cn("h-8 w-8 p-0", isActive && "bg-primary text-primary-foreground")}
        >
            {children}
        </Button>
    )

    return (
        <div className={cn("border rounded-lg overflow-hidden max-w-5xl", className)}>
            {/* Menu Bar */}
            <div className="border-b bg-muted/50 p-2 flex flex-wrap gap-1">
                <MenuButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive("bold")}>
                    <Bold className="h-4 w-4" />
                </MenuButton>

                <MenuButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive("italic")}>
                    <Italic className="h-4 w-4" />
                </MenuButton>

                <MenuButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive("strike")}>
                    <Strikethrough className="h-4 w-4" />
                </MenuButton>

                <MenuButton onClick={() => editor.chain().focus().toggleCode().run()} isActive={editor.isActive("code")}>
                    <Code className="h-4 w-4" />
                </MenuButton>

                <div className="w-px h-6 bg-border mx-1" />

                <MenuButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    isActive={editor.isActive("heading", { level: 1 })}
                >
                    <Heading1 className="h-4 w-4" />
                </MenuButton>

                <MenuButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    isActive={editor.isActive("heading", { level: 2 })}
                >
                    <Heading2 className="h-4 w-4" />
                </MenuButton>

                <MenuButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    isActive={editor.isActive("heading", { level: 3 })}
                >
                    <Heading3 className="h-4 w-4" />
                </MenuButton>

                <div className="w-px h-6 bg-border mx-1" />

                <MenuButton
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    isActive={editor.isActive("bulletList")}
                >
                    <List className="h-4 w-4" />
                </MenuButton>

                <MenuButton
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    isActive={editor.isActive("orderedList")}
                >
                    <ListOrdered className="h-4 w-4" />
                </MenuButton>

                <MenuButton
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    isActive={editor.isActive("blockquote")}
                >
                    <Quote className="h-4 w-4" />
                </MenuButton>

                <div className="w-px h-6 bg-border mx-1" />

                <MenuButton
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().chain().focus().undo().run()}
                >
                    <Undo className="h-4 w-4" />
                </MenuButton>

                <MenuButton
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().chain().focus().redo().run()}
                >
                    <Redo className="h-4 w-4" />
                </MenuButton>
            </div>

            {/* Editor Content */}
            <EditorContent editor={editor} className="min-h-[200px] max-h-[400px] overflow-auto" />
        </div>
    )
}
  