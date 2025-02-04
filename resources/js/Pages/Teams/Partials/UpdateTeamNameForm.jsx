import FormSection from "@/Components/FormSection"
import InputError from "@/Components/InputError"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/shadcn/ui/avatar"
import { Button } from "@/Components/shadcn/ui/button"
import { Input } from "@/Components/shadcn/ui/input"
import { Label } from "@/Components/shadcn/ui/label"
import { router, useForm } from "@inertiajs/react"
import { toast } from "sonner"

export default function UpdateTeamNameForm({ team, permissions }) {
  const form = useForm({
    name: team.name,
  })

  function updateTeamName() {
    form.put(router.route("teams.update", team), {
      errorBag: "updateTeamName",
      preserveScroll: true,
      onSuccess: () => toast.success("Team name updated successfully"),
    })
  }

  return (
    <FormSection onSubmit={updateTeamName}>
      <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
        Team Name
      </h2>

      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        The team's name and owner information.
      </p>

      <div className="mt-6">
        {/* Team Owner Information */}
        <div className="col-span-6">
          <Label>Team Owner</Label>

          <div className="mt-2 flex items-center">
            <Avatar>
              <AvatarImage
                src={team.owner.profile_photo_path ?? ""}
                alt="profile photo"
              />
              <AvatarFallback className="rounded-full bg-secondary p-2">
                {team.name.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="ms-4 leading-tight">
              <div>{team.owner.name}</div>
              <div className="text-sm">{team.owner.email}</div>
            </div>
          </div>
        </div>

        {/* Team Name */}
        <div className="col-span-6 sm:col-span-4">
          <Label htmlFor="name">Team Name</Label>

          <Input
            id="name"
            type="text"
            value={form.data.name}
            onChange={(e) => form.setData("name", e.target.value)}
            className="mt-1 block w-full"
            disabled={!permissions.canUpdateTeam}
          />

          <InputError message={form.errors.name} className="mt-2" />
        </div>
      </div>

      {permissions.canUpdateTeam && (
        <div className="mt-6 flex justify-end">
          <Button
            disabled={form.processing}
            className={form.processing ? "opacity-25" : ""}
          >
            Save
          </Button>
        </div>
      )}
    </FormSection>
  )
}
